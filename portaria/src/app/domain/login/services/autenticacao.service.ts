import { AuthResponse } from './../../../core/models/authResponse';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Login } from 'src/app/core/models/login';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private readonly API = 'api/login';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  autenticar(record: Partial<Login>): Observable<HttpResponse<AuthResponse>> {
    return this.http.post<AuthResponse>(`${this.API}`, record,
    {observe: 'response'}).pipe(
      tap((response) => {
        const auth = response.body || null;

        if (auth !== null) {
          this.authService.salvarToken(auth);
        }
      })
    );
  }
}
