import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultarComponent } from './consultar/consultar.component';
import { IncluirComponent } from './incluir/incluir.component';
import { LancamentosRoutingModule } from './lancamentos-routing.module';
import { PoFieldModule, PoTableModule } from '@po-ui/ng-components';
import { PoPageModule } from '@po-ui/ng-components';
import { PoStepperModule } from '@po-ui/ng-components';
import { PoModalModule } from '@po-ui/ng-components';
import { PoWidgetModule } from '@po-ui/ng-components';
import { PoLoadingModule } from '@po-ui/ng-components';
import { PoInfoModule } from '@po-ui/ng-components';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ConsultarComponent, IncluirComponent],
  imports: [
    CommonModule,
    LancamentosRoutingModule,
    ReactiveFormsModule,
    PoTableModule,
    PoFieldModule,
    PoPageModule,
    PoStepperModule,
    PoModalModule,
    PoWidgetModule,
    PoLoadingModule,
    PoInfoModule,
  ],
})
export class LancamentosModule {}
