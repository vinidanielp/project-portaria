import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisitantesFormComponent } from './visitantes-form/visitantes-form.component';
import { VisitantesListComponent } from './visitantes-list/visitantes-list.component';
import { FilialResolve } from 'src/app/core/resolvers/filial-resolve.guard';

const routes: Routes = [
  {
    path: 'visitantes',
    component: VisitantesListComponent,
  },
  {
    path: 'visitantes/novo',
    component: VisitantesFormComponent,
    resolve: {
      filialData: FilialResolve,
    },
  },
  {
    path: 'visitantes/editar/:id',
    component: VisitantesFormComponent,
    resolve: {
      filialData: FilialResolve,
    },
  },
  {
    path: 'visitantes/visualizar/:id',
    component: VisitantesFormComponent,
    resolve: {
      filialData: FilialResolve,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitantesRoutingModule {}
