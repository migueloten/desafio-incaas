import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessoIndividual } from './processo-individual';

describe('ProcessoIndividual', () => {
  let component: ProcessoIndividual;
  let fixture: ComponentFixture<ProcessoIndividual>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessoIndividual]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessoIndividual);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
