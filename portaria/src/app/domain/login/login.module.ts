import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

import { PoPageLoginModule } from '@po-ui/ng-templates';


@NgModule({
  imports: [LoginRoutingModule, PoPageLoginModule],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class LoginModule {}
