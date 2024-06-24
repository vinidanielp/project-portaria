import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilListComponent } from './perfil-list/perfil-list.component';
import { PerfilFormComponent } from './perfil-form/perfil-form.component';
import { PermissaoGuard } from 'src/app/core/guards/permissao.guard';

const routes: Routes = [
  {
    path: 'configuracoes/perfil',
    component: PerfilListComponent,
  },
  {
    path: 'configuracoes/perfil/novo',
    component: PerfilFormComponent,
    resolve: {
      permissaoData: PermissaoGuard
    }
  },
  {
    path: 'configuracoes/perfil/editar/:id',
    component: PerfilFormComponent,
    resolve: {
      permissaoData: PermissaoGuard
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilRoutingModule {}
