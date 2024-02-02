import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';
import { Perfil } from 'src/app/core/models/perfil';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private readonly API = 'api/perfil';

  constructor(public http: HttpClient) {}

   //Método responsável por buscar e listar todos os registros
   getListaPerfis(): Observable<any> {
    return this.http.get<Perfil[]>(this.API).pipe(first());
  }

  //Método responsável listar perfis por id, para editar
  getPerfilById(id: number) {
    return this.http.get<Perfil>(`${this.API}/${id}`);
  }

  //Método novo perfil
  postNovoPerfil(record: Partial<Perfil>) {
    return this.http.post<Perfil>(this.API, record).pipe(first());
  }

  //Método editar perfil
  putEditarPerfil(record: Partial<Perfil>) {
    return this.http
      .put<Perfil>(this.API, record)
      .pipe(first());
  }

  //Método excluir perfil
  deleteExcluirPerfil(record: Partial<Perfil>) {
    return this.http
      .delete<Perfil>(`${this.API}/excluir/${record.id}`)
      .pipe(first());
  }
}
