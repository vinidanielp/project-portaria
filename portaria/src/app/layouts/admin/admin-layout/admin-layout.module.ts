import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PoMenuModule, PoToolbarModule } from '@po-ui/ng-components';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    PoMenuModule,
    PoToolbarModule
  ]
})
export class AdminLayoutModule { }
