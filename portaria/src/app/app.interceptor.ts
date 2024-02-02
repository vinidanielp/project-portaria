// app.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticacaoService } from './domain/login/services/autenticacao.service';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  constructor(private autenticacaoService: AutenticacaoService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.autenticacaoService.getToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}
