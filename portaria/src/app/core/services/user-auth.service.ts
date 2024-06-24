import { Injectable } from '@angular/core';
import { LocalStorageService } from "../services/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  retornarNomeUsuario(): string {
    const localStorageService = new LocalStorageService();
    const nome = localStorageService.getObject('userAuth').nome;
    if (nome) {
      return nome;
    }
    return "";
  }
}
