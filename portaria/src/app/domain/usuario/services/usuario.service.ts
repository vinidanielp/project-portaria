import { HttpClient } from '@angular/common/http';
import { first, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/core/models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly API = 'api/usuario';

  constructor(public http: HttpClient) {}

  //Método responsável por buscar e listar todos os registros
  getUsuarios(): Observable<any> {
    return this.http.get<Usuario[]>(this.API).pipe(first());
  }

  //Método responsável listar usuario por id, para editar
  getUsuarioById(id: number) {
    return this.http.get<Usuario>(`${this.API}/${id}`).pipe(first());
  }

  //Método novo usuario
  postUsuario(record: Partial<Usuario>) {
    return this.http.post<Usuario>(this.API, record).pipe(first());
  }

  //Método editar usuario
  putUsuario(record: Partial<Usuario>) {
    return this.http
      .put<Usuario>(this.API, record)
      .pipe(first());
  }

  //Método excluir usuario
  deleteUsuario(record: Partial<Usuario>) {
    return this.http
      .delete<Usuario>(`${this.API}/${record.id}`)
      .pipe(first());
  }
}
