import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {
  PoContainerModule,
  PoFieldModule,
  PoModalModule,
  PoPageModule,
  PoTableModule,
} from '@po-ui/ng-components';

@NgModule({
  declarations: [UsuarioListComponent, UsuarioFormComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    ReactiveFormsModule,
    PoContainerModule,
    PoTableModule,
    PoPageModule,
    PoFieldModule,
    PoModalModule,
  ],
})
export class UsuarioModule {}
