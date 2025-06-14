import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

export interface ProcessoUnidade {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  _source: ProcessoSource;
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
  selector: 'app-processo-individual',
  imports: [CommonModule],
  templateUrl: './processo-individual.html',
  styleUrl: './processo-individual.css'
})
export class ProcessoIndividual implements OnInit {
  id: string | null = null;

  processo?: ProcessoSource;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID do processo:', this.id);
  }

  ngOnInit() {
    if (this.id) {
      this.buscarProcessos();
    } else {
      this.error = 'ID do processo não fornecido.';
    }
  }

  buscarProcessos() {
    const url = `/api/api_publica_tjrn/_search`;
    const body = {
      query: {
        match: {
          id: this.id ? this.id : ''
        }
      }
    };
    const headers = new HttpHeaders({
      'Authorization': 'APIKey cDZHYzlZa0JadVREZDJCendQbXY6SkJlTzNjLV9TRENyQk1RdnFKZGRQdw==',
      'Content-Type': 'application/json'
    });

    this.loading = true;
    this.error = '';

    this.http.post<any>(url, body, { headers })
      .subscribe({
        next: data => {
          const hits = data?.hits?.hits || [];
          this.processo = hits[0]?._source;
          console.log('Processo:', this.processo);
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
