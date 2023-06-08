import { Pet } from "./pet";

export class User {
  id : number;
  nome: string;
  email: string;
  telefone: string;
  cidade:string;
  cep: string;
  cpf: string;
  casa: string;
  pet: Pet;

  constructor() {
    this.id = 0;
    this.nome = '';
    this.email = '';
    this.telefone = '';
    this.cidade = '';
    this.cep = ''
    this.cpf = '';
    this.casa = '';
    this.pet = new Pet()
  }
}


