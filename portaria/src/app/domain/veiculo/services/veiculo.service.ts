import { HttpClient } from '@angular/common/http';
import { first, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Veiculo } from 'src/app/core/models/veiculo';

@Injectable({
  providedIn: 'root',
})
export class VeiculoService {
  private readonly API = 'api/veiculo';

  constructor(public http: HttpClient) {}

  //Método responsável por buscar e listar todos os registros
  public getVeiculos(): Observable<any> {
    return this.http.get<Veiculo[]>(this.API).pipe(first());
  }

  //Método responsável listar veiculo por id, para editar
  public getVeiculoById(id: number) {
    return this.http.get<Veiculo>(`${this.API}/${id}`).pipe(first());
  }

  //Método novo veiculo
  public postVeiculo(record: Partial<Veiculo>) {
    return this.http.post<Veiculo>(this.API, record).pipe(first());
  }

  //Método editar veiculo
  public putVeiculo(record: Partial<Veiculo>) {
    return this.http
      .put<Veiculo>(this.API, record)
      .pipe(first());
  }

  //Método excluir veiculo
  public deleteVeiculo(record: Partial<Veiculo>) {
    return this.http
      .delete<Veiculo>(`${this.API}/${record.id}`)
      .pipe(first());
  }

  //Método responsável listar veiculo por id do motorista
  public getVeiculoByIdMotorista(id: number) {
    return this.http.get<Veiculo>(`${this.API}/veiculo-por-id-motorista/${id}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
