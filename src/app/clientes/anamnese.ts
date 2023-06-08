import { Pet } from "./pet";

export class Anamnese {
  id : number;

  motivoDaConsulta : string;
  sintomas: string;
  cirurgias : string;
  doencas : string;
  medicamentos : string;
  comportamento : string;
  reproducao : string;
  viagem : string;
  pet: Pet;
  
  constructor() {
    this.id = 0
    this.motivoDaConsulta ='';
    this.sintomas = '';
    this.cirurgias = '';
    this.doencas = '';
    this.medicamentos = '';
    this.comportamento = ''
    this.reproducao= '';
    this.viagem = '';
    this.pet = new Pet()
  }
}

