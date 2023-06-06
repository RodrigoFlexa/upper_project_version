import { Pet } from "./pet";

export class Cliente {
  id : number;
  nome: string;
  email: string;
  telefone: string;
  cidade:string;
  cep: string;
  cpf: string;
  pet: Pet;

  constructor() {
    this.id = 0;
    this.nome = '';
    this.email = '';
    this.telefone = '';
    this.cidade = '';
    this.cep = ''
    this.cpf = '';
    this.pet = new Pet()
  }
}


