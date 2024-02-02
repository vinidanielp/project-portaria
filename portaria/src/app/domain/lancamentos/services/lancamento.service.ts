import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';
import { Lancamento } from 'src/app/core/models/lancamento';

@Injectable({
  providedIn: 'root',
})
export class LancamentoService {
  private readonly API = 'api/lancamento';

  constructor(public http: HttpClient) {}

  //Método responsável por buscar e listar todos os registros
  public getLancamentos(): Observable<any> {
    return this.http.get<Lancamento[]>(this.API).pipe(first());
  }

    //Método responsável por buscar e listar todos os registros
    public getLancamentoById(id: number): Observable<any> {
      return this.http.get<Lancamento[]>(`${this.API}/${id}`).pipe(first());
    }

  //Método novo lancamento
  public postLancamento(record: Partial<Lancamento>) {
    return this.http.post<Lancamento>(this.API, record).pipe(first());
  }

  //Método editar lancamento
  public putLancamento(record: Partial<Lancamento>) {
    return this.http
      .put<Lancamento>(this.API, record)
      .pipe(first());
  }

  //Método excluir usuario
  deleteLancamento(record: Partial<Lancamento>) {
    return this.http
      .delete<Lancamento>(`${this.API}/${record.id}`)
      .pipe(first());
  }
}
