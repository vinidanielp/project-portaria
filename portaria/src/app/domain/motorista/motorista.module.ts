import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MotoristaRoutingModule } from './motorista-routing.module';
import { MotoristaFormComponent } from './motorista-form/motorista-form.component';
import { MotoristaListComponent } from './motorista-list/motorista-list.component';

import { PoModalModule, PoTableModule } from '@po-ui/ng-components';
import { PoPageModule } from '@po-ui/ng-components';
import { PoFieldModule } from '@po-ui/ng-components';
import { PoContainerModule } from '@po-ui/ng-components';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MotoristaFormComponent, MotoristaListComponent],
  imports: [
    CommonModule,
    MotoristaRoutingModule,
    ReactiveFormsModule,
    PoContainerModule,
    PoTableModule,
    PoPageModule,
    PoFieldModule,
    PoModalModule,
  ],
})
export class MotoristaModule {}
