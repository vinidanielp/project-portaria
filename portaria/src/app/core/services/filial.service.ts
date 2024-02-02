import { Observable, first, toArray } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filial } from '../models/filial';

@Injectable({
  providedIn: 'root'
})
export class FilialService {
  private readonly API = 'api/filial';

  constructor(public http: HttpClient) { }

   //Método responsável por buscar e listar todos os registros
  getFiliais(): Observable<any> {
    return this.http.get<Filial[]>(this.API).pipe(first());
  }
}
