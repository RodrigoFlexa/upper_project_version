import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../clientes';

@Component({
  selector: 'app-cliente-anamnese',
  templateUrl: './cliente-anamnese.component.html',
  styleUrls: ['./cliente-anamnese.component.css']
})
export class ClienteAnamneseComponent implements OnInit {

  sintomaSelecionado: string = '';
  sintomasAdicionados: string[] = [];

  cirurgiasAnteriores: string[] = [];
  cirurgiaSelecionada: string = '';


  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

  }



  adicionarSintoma(): void {
    if (this.sintomaSelecionado) {
      this.sintomasAdicionados.push(this.sintomaSelecionado);
      this.sintomaSelecionado = '';
    }
  }

  adicionarCirurgia(): void {
    if (this.cirurgiaSelecionada) {
      this.cirurgiasAnteriores.push(this.cirurgiaSelecionada);
      this.cirurgiaSelecionada = '';
    }
  }

  removerSintoma(sintomas: string): void {
    const index = this.sintomasAdicionados.indexOf(sintomas);
    if (index !== -1) {
      this.sintomasAdicionados.splice(index, 1);
    }
  }

  removerCirurgia(cirurgia: string): void {
    const index = this.cirurgiasAnteriores.indexOf(cirurgia);
    if (index !== -1) {
      this.cirurgiasAnteriores.splice(index, 1);
    }
  }

  doencasPrevias: string[] = [];
  doencaPreviaSelecionada: string = '';

  adicionarDoencaPrevia(): void {
    if (this.doencaPreviaSelecionada) {
      this.doencasPrevias.push(this.doencaPreviaSelecionada);
      this.doencaPreviaSelecionada = '';
    }
  }

  removerDoencaPrevia(doenca: string): void {
    const index = this.doencasPrevias.indexOf(doenca);
    if (index !== -1) {
      this.doencasPrevias.splice(index, 1);
    }
  }

  medicamentosEmUso: string[] = [];
  medicamentoSelecionado: string = '';

  adicionarMedicamentoEmUso(): void {
    if (this.medicamentoSelecionado) {
      this.medicamentosEmUso.push(this.medicamentoSelecionado);
      this.medicamentoSelecionado = '';
    }
  }

  removerMedicamentoEmUso(medicamento: string): void {
    const index = this.medicamentosEmUso.indexOf(medicamento);
    if (index !== -1) {
      this.medicamentosEmUso.splice(index, 1);
    }
  }

  comportamentos: string[] = [];
  comportamentoSelecionado: string = '';

  adicionarComportamento(): void {
    if (this.comportamentoSelecionado) {
      this.comportamentos.push(this.comportamentoSelecionado);
      this.comportamentoSelecionado = '';
    }
  }

  removerComportamento(comportamento: string): void {
    const index = this.comportamentos.indexOf(comportamento);
    if (index !== -1) {
      this.comportamentos.splice(index, 1);
    }
  }

  reproducao: string[] = [];
  reproducaoSelecionada: string = '';

  adicionarReproducao(): void {
    if (this.reproducaoSelecionada) {
      this.reproducao.push(this.reproducaoSelecionada);
      this.reproducaoSelecionada = '';
    }
  }

  removerReproducao(reproducao: string): void {
    const index = this.reproducao.indexOf(reproducao);
    if (index !== -1) {
      this.reproducao.splice(index, 1);
    }
  }

  viagens: string[] = [];
  viagemSelecionada: string = '';

  adicionarViagem(): void {
    if (this.viagemSelecionada) {
      this.viagens.push(this.viagemSelecionada);
      this.viagemSelecionada = '';
    }
  }

  removerViagem(viagem: string): void {
    const index = this.viagens.indexOf(viagem);
    if (index !== -1) {
      this.viagens.splice(index, 1);
    }
  }


}


