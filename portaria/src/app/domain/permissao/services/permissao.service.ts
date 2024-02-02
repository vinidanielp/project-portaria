import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';
import { Permissao } from 'src/app/core/models/permissao';

@Injectable({
  providedIn: 'root'
})
export class PermissaoService {
  private readonly API = 'api/permissao';

  constructor(public http: HttpClient) {}

  //Método responsável por buscar e listar todos os registros
  getListaPermissoes(): Observable<any> {
    return this.http.get<Permissao[]>(this.API).pipe(first());
  }

  //Método responsável listar permissões por id, para editar
  getPermissaoById(id: number) {
    return this.http.get<Permissao>(`${this.API}/${id}`);
  }

  //Método nova permissão
  postNovaPermissao(record: Partial<Permissao>) {
    return this.http.post<Permissao>(this.API, record).pipe(first());
  }

  //Método editar permissão
  putEditarPermissao(record: Partial<Permissao>) {
    return this.http
      .put<Permissao>(this.API, record)
      .pipe(first());
  }

  //Método excluir permissão
  deleteExcluirPermissao(record: Partial<Permissao>) {
    return this.http
      .delete<Permissao>(`${this.API}/excluir/${record.id}`)
      .pipe(first());
  }
}
