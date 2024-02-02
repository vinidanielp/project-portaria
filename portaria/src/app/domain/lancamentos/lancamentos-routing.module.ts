import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncluirComponent } from './incluir/incluir.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { FilialResolve } from 'src/app/core/resolvers/filial-resolve.guard';
import { MotoristaResolve } from 'src/app/core/resolvers/motorista-resolve.guard';

const routes: Routes = [
  {
    path: 'lancamentos/incluir',
    component: IncluirComponent,
    resolve: {
      filialData: FilialResolve,
      motoristaData: MotoristaResolve,
    },
  },
  {
    path: 'lancamentos/consultar',
    component: ConsultarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LancamentosRoutingModule {}
