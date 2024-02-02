import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitantesRoutingModule } from './visitantes-routing.module';
import { VisitantesListComponent } from './visitantes-list/visitantes-list.component';
import { VisitantesFormComponent } from './visitantes-form/visitantes-form.component';

import {
  PoContainerModule,
  PoPageModule,
  PoTableModule,
} from '@po-ui/ng-components';
import { PoFieldModule } from '@po-ui/ng-components';
import { PoDynamicModule } from '@po-ui/ng-components';
import { PoButtonModule } from '@po-ui/ng-components';
import { PoModalModule } from '@po-ui/ng-components';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [VisitantesFormComponent, VisitantesListComponent],
  imports: [
    CommonModule,
    VisitantesRoutingModule,
    ReactiveFormsModule,
    PoContainerModule,
    PoPageModule,
    PoTableModule,
    PoFieldModule,
    PoModalModule,
  ],
})
export class VisitantesModule {}
