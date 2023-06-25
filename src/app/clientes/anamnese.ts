import { Pet } from "./pet";

export class Anamnese {
  pet_id : number;
  id: number;
  motivoDaConsulta : string;
  sintomas: string;
  cirurgias : string;
  doencas : string;
  medicamentos : string;
  comportamento : string;
  reproducao : string;
  viagem : string;
  dataCriacao: string;


  constructor() {
    this.pet_id = 0;
    this.id = 0;
    this.motivoDaConsulta ='';
    this.sintomas = '';
    this.cirurgias = '';
    this.doencas = '';
    this.medicamentos = '';
    this.comportamento = ''
    this.reproducao= '';
    this.viagem = '';
    this.dataCriacao=''
  }
}

