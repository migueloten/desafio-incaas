import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { PartesInteressadas } from './components/partes-interessadas/partes-interessadas';
import { Consulta } from './components/consulta/consulta';
import { ProcessoIndividual } from './components/processo-individual/processo-individual';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'partes-interessadas',
    component: PartesInteressadas
  },
  {
    path: 'consultas-processos',
    component: Consulta
  },
  {
    path: 'processo-individual/:id',
    component: ProcessoIndividual
  }
];
