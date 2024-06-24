// app.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(this.tokenService.possuiToken() && !this.tokenService.tokenExpirado()) {
      const token = this.tokenService.retornarToken();

      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      })
    } else {
      this.tokenService.excluirToken();
      this.router.navigate(['/login']);
    }

    return next.handle(request);
  }
}
