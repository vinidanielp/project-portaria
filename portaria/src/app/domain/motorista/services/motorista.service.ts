import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Motorista } from 'src/app/core/models/motorista';

@Injectable({
  providedIn: 'root',
})
export class MotoristaService {
  private readonly API = 'api/motorista';

  constructor(public http: HttpClient) {}

  //Método responsável por buscar e listar todos os registros
  getMotoristas(): Observable<any> {
    return this.http.get<Motorista[]>(this.API).pipe(first());
  }

  //Método responsável por buscar e listar todos os registros ativos
  getMotoristasAtivos(): Observable<any> {
    return this.http
      .get<Motorista[]>(`${this.API}/motorista-ativo`)
      .pipe(first());
  }

  //Método responsável listar motorista por id, para editar
  getMotoristaById(id: number) {
    return this.http.get<Motorista>(`${this.API}/${id}`).pipe(first());
  }

  //Método novo motorista
  postMotorista(record: Partial<Motorista>) {
    return this.http.post<Motorista>(this.API, record).pipe(first());
  }

  //Método editar motorista
  putMotorista(record: Partial<Motorista>) {
    return this.http
      .put<Motorista>(this.API, record)
      .pipe(first());
  }

  //Método excluir motorista
  deleteMotorista(record: Partial<Motorista>) {
    return this.http
      .delete<Motorista>(`${this.API}/${record.id}`)
      .pipe(first());
  }
}
