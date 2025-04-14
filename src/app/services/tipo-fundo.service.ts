import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoFundoModel } from '../models/tipo-fundo.model';

@Injectable({
  providedIn: 'root',
})
export class TipoFundoService {
  private apiUrl = `${environment.apiUrl}/tipofundo`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoFundoModel[]> {
    return this.http.get<TipoFundoModel[]>(this.apiUrl);
  }
}