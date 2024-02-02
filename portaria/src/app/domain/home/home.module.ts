import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

import { PoContainerModule, PoTreeViewModule } from '@po-ui/ng-components';
import { PoPageModule } from '@po-ui/ng-components';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PoContainerModule,
    PoPageModule,
    PoTreeViewModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
