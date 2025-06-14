import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-cadastro-interesse',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-cadastro-interesse.html',
  styleUrl: './form-cadastro-interesse.css'
})
export class FormCadastroInteresse implements OnInit {
  form!: FormGroup;
  tipoPessoaOptions = [
    { label: 'Pessoa Física', value: 'pf' },
    { label: 'Pessoa Jurídica', value: 'pj' }
  ];

  constructor(private fb: FormBuilder, private router: Router) {}

  reloadRoute() {
  const current = this.router.url;
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate([current]);
  });
}

  ngOnInit() {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      tipoPessoa: ['pf', Validators.required],
      document: ['', [Validators.required, Validators.minLength(11)]],
      email: ['', [Validators.required, Validators.email]]
    });

    // Atualiza o título e validador ao mudar tipoPessoa
    this.form.get('tipoPessoa')?.valueChanges.subscribe(tipo => {
      const doc = this.form.get('document');
      if (tipo === 'pj') {
        doc?.setValidators([Validators.required, Validators.minLength(14), Validators.pattern(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)]);
      } else {
        doc?.setValidators([Validators.required, Validators.minLength(11), Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]);
      }
      doc?.updateValueAndValidity();
    });
  }

  mascaraCPF(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    this.form.controls['document'].setValue(value, { emitEvent: false });
  }

  mascaraCNPJ(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 14) {
      value = value.slice(0, 14);
    }
    value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');

    this.form.controls['document'].setValue(value, { emitEvent: false });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Dados enviados:', this.form.value);

      const stored = localStorage.getItem('cadastros') || '[]';
      const cadastros = JSON.parse(stored);
      const nextId = cadastros.length > 0 ? Math.max(...cadastros.map((c: any) => c.id)) + 1 : 1;
      const novoCadastro = { id: nextId, ...this.form.value };
      cadastros.push(novoCadastro);
      localStorage.setItem('cadastros', JSON.stringify(cadastros));
      this.reloadRoute();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
