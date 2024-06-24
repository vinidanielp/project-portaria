import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VeiculoListComponent } from './veiculo-list/veiculo-list.component';
import { VeiculoFormComponent } from './veiculo-form/veiculo-form.component';
import { FilialGuard } from 'src/app/core/guards/filial.guard';
import { MotoristaGuard } from 'src/app/core/guards/motorista.guard';


const routes: Routes = [
  {
    path: 'cadastros/veiculo',
    component: VeiculoListComponent,
  },
  {
    path: 'cadastros/veiculo/novo',
    component: VeiculoFormComponent,
    resolve: {
      filialData: FilialGuard,
      motoristaData: MotoristaGuard
    },
  },
  {
    path: 'cadastros/veiculo/editar/:id',
    component: VeiculoFormComponent,
    resolve: {
      filialData: FilialGuard,
      motoristaData: MotoristaGuard,
    },
  },
  {
    path: 'cadastros/veiculo/visualizar/:id',
    component: VeiculoFormComponent,
    resolve: {
      filialData: FilialGuard,
      motoristaData: MotoristaGuard,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VeiculoRoutingModule {}
