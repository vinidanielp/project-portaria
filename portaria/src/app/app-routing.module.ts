import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin/admin-layout/admin-layout.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '',
    loadChildren: () =>
      import('./domain/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./domain/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('./domain/lancamentos/lancamentos.module').then(
            (m) => m.LancamentosModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./domain/motorista/motorista.module').then(
            (m) => m.MotoristaModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./domain/veiculo/veiculo.module').then(
            (m) => m.VeiculoModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./domain/visitantes/visitantes.module').then(
            (m) => m.VisitantesModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./domain/usuario/usuario.module').then(
            (m) => m.UsuarioModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./domain/permissao/permissao.module').then(
            (m) => m.PermissaoModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./domain/perfil/perfil.module').then(
            (m) => m.PerfilModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
