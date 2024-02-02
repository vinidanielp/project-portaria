import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissaoFormComponent } from './permissao-form/permissao-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PermissaoRoutingModule } from './permissao-routing.module';
import { PoContainerModule, PoFieldModule, PoModalModule, PoPageModule, PoTableModule } from '@po-ui/ng-components';
import { PermissaoListComponent } from './permissao-list/permissao-list.component';

@NgModule({
  declarations: [
    PermissaoFormComponent,
    PermissaoListComponent
  ],
  imports: [
    CommonModule,
    PermissaoRoutingModule,
    ReactiveFormsModule,
    PoContainerModule,
    PoTableModule,
    PoPageModule,
    PoFieldModule,
    PoModalModule,
  ]
})
export class PermissaoModule { }
