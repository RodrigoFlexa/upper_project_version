import { Injectable } from '@angular/core';
import { Cliente } from './clientes/clientes';
import { Pet } from './clientes/pet';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { User } from './clientes/user';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http:HttpClient) { }

  salvar(cliente:User): Observable<User> {
    return this.http.post<User>('http://localhost:8080/clientes',cliente)
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8080/clientes/');
  }

  // get_cliente(): Cliente {
  //   let cliente: Cliente = new Cliente();
  //   cliente.id = 0;
  //   cliente.nome = 'rodrigo';
  //   cliente.email = 'rodrigoflexa0211@gmail.com';
  //   cliente.telefone = '91984054107';
  //   cliente.cidade = 'ananindeua';
  //   cliente.cep = '67120370';
  //   cliente.cpf = '000000000000';
  //   let pet: Pet = new Pet();
  //   pet.id = 1;
  //   pet.nome = 'Wolverine';
  //   pet.idade = 10;
  //   pet.peso = 7;
  //   pet.especie='Cão'
  //   pet.raca='shitzu'
  //   cliente.pet = pet;
  //   return cliente;
  // }
}
