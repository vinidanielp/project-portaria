import { MotoristaResolve } from './../../core/resolvers/motorista-resolve.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VeiculoListComponent } from './veiculo-list/veiculo-list.component';
import { VeiculoFormComponent } from './veiculo-form/veiculo-form.component';
import { FilialResolve } from 'src/app/core/resolvers/filial-resolve.guard';

const routes: Routes = [
  {
    path: 'cadastros/veiculo',
    component: VeiculoListComponent,
  },
  {
    path: 'cadastros/veiculo/novo',
    component: VeiculoFormComponent,
    resolve: {
      filialData: FilialResolve,
      motoristaData: MotoristaResolve,
    },
  },
  {
    path: 'cadastros/veiculo/editar/:id',
    component: VeiculoFormComponent,
    resolve: {
      filialData: FilialResolve,
      motoristaData: MotoristaResolve,
    },
  },
  {
    path: 'cadastros/veiculo/visualizar/:id',
    component: VeiculoFormComponent,
    resolve: {
      filialData: FilialResolve,
      motoristaData: MotoristaResolve,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VeiculoRoutingModule {}
