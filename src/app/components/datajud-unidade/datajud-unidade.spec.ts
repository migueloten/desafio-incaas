import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatajudUnidade } from './datajud-unidade';

describe('DatajudUnidade', () => {
  let component: DatajudUnidade;
  let fixture: ComponentFixture<DatajudUnidade>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatajudUnidade]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatajudUnidade);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
