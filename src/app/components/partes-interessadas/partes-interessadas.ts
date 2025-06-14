import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormCadastroInteresse } from '../form-cadastro-interesse/form-cadastro-interesse';
import { FormEdicaoInteresse } from '../form-edicao-interesse/form-edicao-interesse';

interface Parte {
  id: number;
  nome: string;
  tipoPessoa: string;
  document: string;
  email: string;
}

@Component({
  selector: 'app-partes-interessadas',
  imports: [FormCadastroInteresse, FormEdicaoInteresse],
  templateUrl: './partes-interessadas.html',
  styleUrl: './partes-interessadas.css'
})
export class PartesInteressadas implements OnInit {
  formCadastroIsOpen: boolean = false;
  formEdicaoIsOpen: boolean = false;
  idCadastroEdicao: number = 0;

  list: Parte[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.load();
    window.addEventListener('storage', () => this.load());
  }

  ngOnChanges() {
    this.load();
  }

  load() {
    this.list = JSON.parse(localStorage.getItem('cadastros') || '[]');
  }

  handleOpenFormCadastro() {
    this.formCadastroIsOpen = true
    if (this.formEdicaoIsOpen) {
      this.handleCloseFormEdicao();
    }
  }

  handleCloseForms() {
    this.formCadastroIsOpen = false;
    this.formEdicaoIsOpen = false;
  }

  handleOpenFormEdicao(id: number) {
    this.idCadastroEdicao = id;
    this.formCadastroIsOpen = false;
    this.formEdicaoIsOpen = false;
    this.cdr.detectChanges(); // força atualização do DOM
    this.formEdicaoIsOpen = true;
    this.cdr.detectChanges();
    console.log("estado do formEdicaoIsOpen", this.formEdicaoIsOpen);
  }

  handleCloseFormEdicao() {
    this.formEdicaoIsOpen = false;
  }
}
