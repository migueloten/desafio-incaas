import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCadastroInteresse } from './form-cadastro-interesse';

describe('FormCadastroInteresse', () => {
  let component: FormCadastroInteresse;
  let fixture: ComponentFixture<FormCadastroInteresse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCadastroInteresse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCadastroInteresse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
