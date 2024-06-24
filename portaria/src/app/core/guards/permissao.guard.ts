import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { PermissaoService } from 'src/app/domain/permissao/services/permissao.service';
import { Permissao } from '../models/permissao';

/**
 * Class guard responsavel por buscar as permissões
 *
 * @author Isoeste Metálica
 */
@Injectable({
  providedIn: 'root',
})
export class PermissaoGuard {
  constructor(
    private router: Router,
    private permissaoService: PermissaoService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Permissao> {
    return this.permissaoService.getListaPermissoes();
  }
}
