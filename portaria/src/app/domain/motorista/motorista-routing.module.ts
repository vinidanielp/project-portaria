import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MotoristaFormComponent } from './motorista-form/motorista-form.component';
import { MotoristaListComponent } from './motorista-list/motorista-list.component';
import { FilialGuard } from 'src/app/core/guards/filial.guard';

const routes: Routes = [
  {
    path: 'cadastros/motorista',
    component: MotoristaListComponent,
  },
  {
    path: 'cadastros/motorista/novo',
    component: MotoristaFormComponent,
    resolve: {
      filialData: FilialGuard
    }
  },
  {
    path: 'cadastros/motorista/editar/:id',
    component: MotoristaFormComponent,
    resolve: {
      filialData: FilialGuard
    }
  },
  {
    path: 'cadastros/motorista/visualizar/:id',
    component: MotoristaFormComponent,
    resolve: {
      filialData: FilialGuard
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MotoristaRoutingModule {}
