import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncluirComponent } from './incluir/incluir.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { FilialGuard } from 'src/app/core/guards/filial.guard';
import { MotoristaGuard } from 'src/app/core/guards/motorista.guard';

const routes: Routes = [
  {
    path: 'lancamentos/incluir',
    component: IncluirComponent,
    resolve: {
      filialData: FilialGuard,
      motoristaData: MotoristaGuard,
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
