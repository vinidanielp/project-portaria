import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import { Filial } from 'src/app/core/models/filial';
import { FilialService } from 'src/app/core/services/filial.service';

/**
 * Class guard responsavel por buscar as filiais
 *
 * @author Isoeste Metálica
 */
@Injectable({
    providedIn: 'root'
})
export class FilialGuard {

  constructor(private router: Router, private filialService: FilialService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Filial> {
    return this.filialService.getFiliais();
  }
}
