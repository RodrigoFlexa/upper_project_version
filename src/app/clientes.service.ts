import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './clientes/user';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private apiURL = 'http://localhost:8080/api/users'; // URL completa da API


  constructor(private http: HttpClient) { }

  getAllClientes(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURL);
  }

  salvar(cliente: User): Observable<User> {
    return this.http.post<User>(this.apiURL, cliente);
  }

  getClienteById(id: number): Observable<User> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<User>(url);
  }

  deletarCliente(id: number): Observable<void> {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete<void>(url);
  }
}
