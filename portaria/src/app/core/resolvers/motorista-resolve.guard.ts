import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { MotoristaService } from 'src/app/domain/motorista/services/motorista.service';
import { Motorista } from '../models/motorista';

/**
 * Class resolves responsavel por buscar os motoristas ativos
 *
 * @author Isoeste Metálica
 */
@Injectable({
  providedIn: 'root',
})
export class MotoristaResolve {
  constructor(
    private router: Router,
    private motoristaService: MotoristaService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Motorista> {
    return this.motoristaService.getMotoristasAtivos();
  }
}
