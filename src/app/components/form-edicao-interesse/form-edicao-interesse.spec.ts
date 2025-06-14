import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEdicaoInteresse } from './form-edicao-interesse';

describe('FormEdicaoInteresse', () => {
  let component: FormEdicaoInteresse;
  let fixture: ComponentFixture<FormEdicaoInteresse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEdicaoInteresse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEdicaoInteresse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
