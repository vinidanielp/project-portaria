import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Visitante } from 'src/app/core/models/visitante';

@Injectable({
  providedIn: 'root',
})
export class VisitanteService {
  private readonly API = 'api/visitante';

  constructor(public http: HttpClient) {}

  //Método responsável por buscar e listar todos os registros
  getVisitantes(): Observable<any> {
    return this.http.get<Visitante[]>(this.API).pipe(first());
  }

  //Método responsável listar visitante por id, para editar
  getVisitantesById(id: number) {
    return this.http.get<Visitante>(`${this.API}/${id}`).pipe(first());
  }

  //Método novo motorista
  postVisitante(record: Partial<Visitante>) {
    return this.http.post<Visitante>(this.API, record).pipe(first());
  }

  //Método editar motorista
  putVisitante(record: Partial<Visitante>) {
    return this.http
      .put<Visitante>(this.API, record)
      .pipe(first());
  }

  //Método excluir motorista
  deleteVisitante(record: Partial<Visitante>) {
    return this.http
      .delete<Visitante>(`${this.API}/${record.id}`)
      .pipe(first());
  }

  //Método responsável por listar visitas no dia atual
  getListaVisitantesHoje(): Observable<any> {
    return this.http
      .get<Visitante[]>(`${this.API}/visitante-hoje`)
      .pipe(first());
  }

  //Método responsável por listar visitas da proximas
  getListaVisitantesProximos(): Observable<any> {
    return this.http
      .get<Visitante[]>(`${this.API}/visitante-proximo`)
      .pipe(first());
  }
}
