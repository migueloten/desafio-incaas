import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface ProcessoUnidade {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  _source: ProcessoSource;
  sort?: any[];
}

export interface ProcessoSource {
  numeroProcesso: string;
  classe: { codigo: number; nome: string };
  sistema: { codigo: number; nome: string };
  formato: { codigo: number; nome: string };
  tribunal: string;
  dataHoraUltimaAtualizacao: string;
  grau: string;
  '@timestamp': string;
  dataAjuizamento: string;
  movimentos: Movimento[];
  id: string;
  nivelSigilo: number;
  orgaoJulgador: OrgaoJulgador;
  assuntos: Assunto[];
}

export interface Movimento {
  complementosTabelados?: Complemento[];
  codigo: number;
  nome: string;
  dataHora: string;
}

export interface Complemento {
  codigo: number;
  valor: number;
  nome: string;
  descricao: string;
}

export interface OrgaoJulgador {
  codigoMunicipioIBGE: number;
  codigo: number;
  nome: string;
}

export interface Assunto {
  codigo: number;
  nome: string;
}

@Component({
  selector: 'app-datajud-unidade',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './datajud-unidade.html',
  styleUrls: ['./datajud-unidade.css']
})
export class DatajudUnidade implements OnInit {
  form!: FormGroup;
  processos: ProcessoSource[] = [];
  lastSort: any[] | null = null;
  size = 50;
  loading = false;
  error = '';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      num_process: [''],
      classe: ['']
    });
    this.buscarProcessos(false);
  }

  trackByProcesso(index: number, item: ProcessoSource): string {
    return item.numeroProcesso;
  }

  buscarProcessos(nextPage: boolean) {
    const filtros: any = {};
    if (this.form.value.num_process) {
      filtros['numeroProcesso'] = this.form.value.num_process;
    }
    if (this.form.value.classe) {
      filtros['classe.nome'] = this.form.value.classe;
    }

    const body: any = {
      size: this.size,
      query: Object.keys(filtros).length
        ? { bool: { must: Object.entries(filtros).map(([k, v]) => ({ match: { [k]: v } })) } }
        : { match_all: {} },
      sort: [{ '@timestamp': { order: 'asc' } }]
    };
    if (nextPage && this.lastSort) {
      body.search_after = this.lastSort;
    }

    const url = `/api/api_publica_tjrn/_search`;
    const headers = new HttpHeaders({
      'Authorization':
        'APIKey cDZHYzlZa0JadVREZDJCendQbXY6SkJlTzNjLV9TRENyQk1RdnFKZGRQdw==',
      'Content-Type': 'application/json'
    });

    this.loading = true;
    this.error = '';

    this.http.post<any>(url, body, { headers }).subscribe({
      next: data => {
        const hits = data?.hits?.hits || [];
        this.processos = hits.map((h: ProcessoUnidade) => h._source);
        this.lastSort =
          hits.length && hits[hits.length - 1].sort
            ? hits[hits.length - 1].sort
            : null;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        this.error = 'Erro ao buscar processos.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  carregarProximaPagina() {
    if (this.lastSort) {
      this.buscarProcessos(true);
    }
  }

  onSubmit() {
    this.lastSort = null;
    this.buscarProcessos(false);
  }

  dateBR(date: string) {
    if (!date) return "";

    if (date.includes("T")) {
      let [day, time] = date.split("T");
      let [year, month, dayNum] = day.split("-").map(e => parseInt(e));
      let [hour, minute, second] = time.split(":").map(e => parseInt(e));

      return new Date(year, month - 1, dayNum, hour, minute, second).toLocaleString("pt-BR");
    } else {
      let [year, month, dayNum] = date.split("-").map(e => parseInt(e));

      return new Date(year, month - 1, dayNum).toLocaleDateString("pt-BR");
    }
  }
}
