import { UserAuthService } from './../../../../core/services/user-auth.service';
import { TokenService } from './../../../../core/services/token.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminLayoutService {

  constructor(
    private tokenService: TokenService,
    private userAuthService: UserAuthService
  ) { }

  public logout() {
    this.tokenService.excluirToken();
  }

  public recuperaNomeUsuarioLogado() {
    return this.userAuthService.retornarNomeUsuario();
  }
}
