import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Anamnese } from './clientes/anamnese';

@Injectable({
  providedIn: 'root'
})
export class AnamneseService {
  private baseUrl = 'https://laikapet.sinopeoficial.com.br/api/anamneses';

  constructor(private http: HttpClient) { }

  cadastrarAnamnese(id: number, anamnese: Anamnese):Observable<Anamnese>{
    const url = `https://laikapet.sinopeoficial.com.br/api/anamneses/pets/${id}`;
    return this.http.post<Anamnese>(url, anamnese);
  }
  getAnamnesesByPetId(id: number): Observable<Anamnese[]> {
    const url = `https://laikapet.sinopeoficial.com.br/api/anamneses/pets/${id}/anamneses`;
    return this.http.get<Anamnese[]>(url);
  }
}
