import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VeiculoRoutingModule } from './veiculo-routing.module';
import { VeiculoFormComponent } from './veiculo-form/veiculo-form.component';
import { VeiculoListComponent } from './veiculo-list/veiculo-list.component';
import {
  PoContainerModule,
  PoModalModule,
  PoTableModule,
} from '@po-ui/ng-components';
import { PoPageModule } from '@po-ui/ng-components';
import { PoFieldModule } from '@po-ui/ng-components';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [VeiculoFormComponent, VeiculoListComponent],
  imports: [
    CommonModule,
    VeiculoRoutingModule,
    ReactiveFormsModule,
    PoContainerModule,
    PoTableModule,
    PoPageModule,
    PoFieldModule,
    PoModalModule,
  ],
})
export class VeiculoModule {}
