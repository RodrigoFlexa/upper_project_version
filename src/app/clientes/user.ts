export class User {
  id: number;
  pet_name: string;
  pet_idade: number;
  pet_peso: number;
  pet_especie: string;
  pet_raca: string

  name: string;
  email: string;
  telefone: string;
  cidade:string;
  cep: string;
  cpf: string;

  constructor() {
    this.id = 0;
    this.pet_name = '';
    this.pet_idade = 0;
    this.pet_peso = 0;
    this.pet_especie =  "";
    this.pet_raca =  ""
    this.name = '';
    this.email = '';
    this.telefone = '';
    this.cidade = '';
    this.cep = ''
    this.cpf = '';
  }
}
