import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissaoListComponent } from './permissao-list/permissao-list.component';
import { PermissaoFormComponent } from './permissao-form/permissao-form.component';


const routes: Routes = [
  {
    path: 'configuracoes/permissao',
    component: PermissaoListComponent,
  },
  {
    path: 'configuracoes/permissao/novo',
    component: PermissaoFormComponent,
  },
  {
    path: 'configuracoes/permissao/editar/:id',
    component: PermissaoFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermissaoRoutingModule {}
