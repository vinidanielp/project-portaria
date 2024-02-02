import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { FilialResolve } from 'src/app/core/resolvers/filial-resolve.guard';
import { PerfilResolve } from 'src/app/core/resolvers/perfil-resolve.guard';

const routes: Routes = [
  {
    path: 'configuracoes/usuario',
    component: UsuarioListComponent,
  },
  {
    path: 'configuracoes/usuario/novo',
    component: UsuarioFormComponent,
    resolve: {
      filialData: FilialResolve,
      perfilData: PerfilResolve
    },
  },
  {
    path: 'configuracoes/usuario/editar/:id',
    component: UsuarioFormComponent,
    resolve: {
      filialData: FilialResolve,
      perfilData: PerfilResolve
    },
  },
  {
    path: 'configuracoes/usuario/visualizar/:id',
    component: UsuarioFormComponent,
    resolve: {
      filialData: FilialResolve,
      perfilData: PerfilResolve
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioRoutingModule {}
