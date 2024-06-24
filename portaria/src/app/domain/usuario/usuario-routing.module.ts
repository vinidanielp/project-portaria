import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { FilialGuard } from 'src/app/core/guards/filial.guard';
import { PerfilGuard } from 'src/app/core/guards/perfil.guard';

const routes: Routes = [
  {
    path: 'configuracoes/usuario',
    component: UsuarioListComponent,
  },
  {
    path: 'configuracoes/usuario/novo',
    component: UsuarioFormComponent,
    resolve: {
      filialData: FilialGuard,
      perfilData: PerfilGuard
    },
  },
  {
    path: 'configuracoes/usuario/editar/:id',
    component: UsuarioFormComponent,
    resolve: {
      filialData: FilialGuard,
      perfilData: PerfilGuard
    },
  },
  {
    path: 'configuracoes/usuario/visualizar/:id',
    component: UsuarioFormComponent,
    resolve: {
      filialData: FilialGuard,
      perfilData: PerfilGuard
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioRoutingModule {}
