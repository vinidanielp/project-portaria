import { Injectable } from '@angular/core';
import { AuthResponse } from '../models/authResponse';

const KEY = 'userAuth'
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  salvarToken(token: AuthResponse) {
    return localStorage.setItem(KEY, JSON.stringify(token));
  }

  excluirToken() {
    localStorage.removeItem(KEY);
  }

  retornarToken(): string{
    const token = localStorage.getItem('userAuth');
    if (token) {
      const tokenInfo = JSON.parse(token);
      return tokenInfo.token || null;
    }
    return null || "";
  }

  tokenExpirado(): boolean {
    const token = this.retornarToken();
    if (!token) return true;
    const expiraEm = this.getDataExpiracaoToken(token);

    if (expiraEm) {
      return expiraEm <= new Date();
    }

    return true;
  }

  getDataExpiracaoToken(token: string): Date | null {
    const tokenInfo = JSON.parse(atob(token.split('.')[1]));

    if (tokenInfo?.exp) {
      return new Date(tokenInfo.exp * 1000);
    }

    return null;
  }

  possuiToken(): boolean {
    return !!this.retornarToken();
  }
}
