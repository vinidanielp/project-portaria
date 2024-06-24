import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisitantesFormComponent } from './visitantes-form/visitantes-form.component';
import { VisitantesListComponent } from './visitantes-list/visitantes-list.component';
import { FilialGuard } from 'src/app/core/guards/filial.guard';

const routes: Routes = [
  {
    path: 'visitantes',
    component: VisitantesListComponent,
  },
  {
    path: 'visitantes/novo',
    component: VisitantesFormComponent,
    resolve: {
      filialData: FilialGuard,
    },
  },
  {
    path: 'visitantes/editar/:id',
    component: VisitantesFormComponent,
    resolve: {
      filialData: FilialGuard,
    },
  },
  {
    path: 'visitantes/visualizar/:id',
    component: VisitantesFormComponent,
    resolve: {
      filialData: FilialGuard,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitantesRoutingModule {}
