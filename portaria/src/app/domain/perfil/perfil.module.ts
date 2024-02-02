import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilRoutingModule } from './perfil-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PoContainerModule, PoFieldModule, PoModalModule, PoPageModule, PoTableModule } from '@po-ui/ng-components';
import { PerfilListComponent } from './perfil-list/perfil-list.component';
import { PerfilFormComponent } from './perfil-form/perfil-form.component';

@NgModule({
  declarations: [PerfilListComponent, PerfilFormComponent],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    ReactiveFormsModule,
    PoContainerModule,
    PoTableModule,
    PoPageModule,
    PoFieldModule,
    PoModalModule,
  ]
})
export class PerfilModule { }
