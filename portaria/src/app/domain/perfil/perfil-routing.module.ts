import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilListComponent } from './perfil-list/perfil-list.component';
import { PerfilFormComponent } from './perfil-form/perfil-form.component';
import { PermissaoResolve } from 'src/app/core/resolvers/permissao-resolve.guard';

const routes: Routes = [
  {
    path: 'configuracoes/perfil',
    component: PerfilListComponent,
  },
  {
    path: 'configuracoes/perfil/novo',
    component: PerfilFormComponent,
    resolve: {
      permissaoData: PermissaoResolve
    }
  },
  {
    path: 'configuracoes/perfil/editar/:id',
    component: PerfilFormComponent,
    resolve: {
      permissaoData: PermissaoResolve
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilRoutingModule {}
