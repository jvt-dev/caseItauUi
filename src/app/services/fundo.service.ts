import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FundoModel } from '../models/fundo.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FundoService {
  private apiUrl = `${environment.apiUrl}/fundo`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<FundoModel[]> {
    return this.http.get<FundoModel[]>(this.apiUrl);
  }

  getByCodigo(codigo: string): Observable<FundoModel> {
    return this.http.get<FundoModel>(`${this.apiUrl}/${codigo}`);
  }

  create(fundo: FundoModel): Observable<void> {
    return this.http.post<void>(this.apiUrl, fundo);
  }

  update(codigo: string, fundo: FundoModel): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${codigo}`, fundo);
  }

  delete(codigo: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${codigo}`);
  }

  movimentarPatrimonio(codigo: string, valorPatrimonio: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${codigo}/patrimonio`, valorPatrimonio);
  }
}