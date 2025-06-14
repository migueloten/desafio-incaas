import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartesInteressadas } from './partes-interessadas';

describe('PartesInteressadas', () => {
  let component: PartesInteressadas;
  let fixture: ComponentFixture<PartesInteressadas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartesInteressadas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartesInteressadas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
