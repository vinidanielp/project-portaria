import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Permissao } from '../models/permissao';
import { PerfilService } from 'src/app/domain/perfil/services/perfil.service';

/**
 * Class resolves responsavel por buscar os perfis.
 *
 * @author Isoeste Metálica
 */
@Injectable({
  providedIn: 'root',
})
export class PerfilResolve {
  constructor(
    private router: Router,
    private perfilService: PerfilService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Permissao> {
    return this.perfilService.getListaPerfis();
  }
}
