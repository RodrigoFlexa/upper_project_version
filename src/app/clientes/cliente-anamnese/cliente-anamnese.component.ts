import { Anamnese } from './../anamnese';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from 'src/app/clientes.service';
import { User } from '../user';
import { AnamneseService } from 'src/app/anamnese.service';
import { Chart} from 'chart.js';
import { ChartOptions } from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { format } from 'date-fns';

@Component({
  selector: 'app-cliente-anamnese',
  templateUrl: './cliente-anamnese.component.html',
  styleUrls: ['./cliente-anamnese.component.css'],
})
export class ClienteAnamneseComponent implements OnInit, AfterViewInit {
  cliente: User = new User;
  id !: number;
  anamneses: Anamnese[] = [];

  suporteDiagnosticoAtivado: boolean = false;
  chartCreated: boolean = false;
  chartCardActivated: boolean = false;

  motivos: string[] = [];
  motivosSelecionada: string = '';

  sintomasAdicionados: string[] = [];
  sintomaSelecionado: string = '';

  cirurgiasAnteriores: string[] = [];
  cirurgiaSelecionada: string = '';

  doencasPrevias: string[] = [];
  doencaPreviaSelecionada: string = '';

  medicamentosEmUso: string[] = [];
  medicamentoSelecionado: string = '';

  comportamentos: string[] = [];
  comportamentoSelecionado: string = '';

  reproducao: string[] = [];
  reproducaoSelecionada: string = '';

  viagens: string[] = [];
  viagemSelecionada: string = '';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private service : ClientesService,
    private anamneseService: AnamneseService,
    private dialog: MatDialog
    ) {}

  async ngOnInit():  Promise<void>{
    if (history.state && history.state.cliente) {
      this.cliente = history.state.cliente;
    }
    const par : string =  this.route.snapshot.paramMap.get('id') as string;
    this.id  =  parseInt(par);
    await this.getClienteById(this.id);
    await this.getAnamnesesByPetId(this.id);
  }

  async getClienteById(MeuId: number) {
    this.service.getClienteById(MeuId).subscribe(
      (resposta: User) => {
        this.cliente = resposta;
      },
      error => {
        console.error('Erro ao obter o cliente:', error);
      }
    );
  }

  async getAnamnesesByPetId(id: number){
    this.anamneseService.getAnamnesesByPetId(id).subscribe(
      (anamneses: Anamnese[]) => {
        this.anamneses = anamneses;
        console.log('Anamneses:', this.anamneses);
      },
      (error) => {
        console.error('Erro ao obter as anamneses:', error);
      }
    );
  }

  voltarPraatendimento(cliente: User) {
    this.router.navigate(['/cliente', cliente.id], { state: { cliente } });
  }

  ativarSuporteDiagnostico() {
    const preenchido = this.fichaAnamnesePreenchida();
    if (preenchido) {
      this.suporteDiagnosticoAtivado = true;
      this.chartCardActivated = true; // Ativar a classe chart-card
      if (!this.chartCreated) {
        const canvas = document.getElementById('myChart') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        if (ctx !== null) { // Verificar se o contexto é diferente de null
          this.createPieChart(ctx);
          this.chartCreated = true;
        } else {
          console.error('Failed to get the 2D rendering context for the canvas element');
        }
      }
    } else {
      alert('Por favor, preencha a ficha de anamnese por completo antes de ativar o suporte ao diagnóstico.');
    }
  }

  createPieChart(ctx: CanvasRenderingContext2D): void {
    const options: ChartOptions<'pie'> = {
      plugins: {
        legend: {
          position: 'right'
        }
      }
    };
    new Chart(ctx, {
      type: 'pie',
      data: {
        datasets: [{
          data: [10, 20, 30],
          backgroundColor: ['red', 'yellow', 'blue']
        }],
        labels: ['Red', 'Yellow', 'Blue']
      },
      options: options
    });
  }

  fichaAnamnesePreenchida(): boolean {
    return (
      this.motivos.length > 0 &&
      this.sintomasAdicionados.length > 0 &&
      this.cirurgiasAnteriores.length > 0 &&
      this.doencasPrevias.length > 0 &&
      this.medicamentosEmUso.length > 0 &&
      this.comportamentos.length > 0 &&
      this.reproducao.length > 0 &&
      this.viagens.length > 0
    );
  }

  openSuccessDialog(message: string): void {
    this.dialog.open(SuccessDialogComponent, {
      width: '400px',
      data: message,
    });
  }


  cadastrarAnamnese() {
    console.log('Motivos:', this.motivos);
    console.log('Sintomas:', this.sintomasAdicionados);
    console.log('Cirurgias anteriores:', this.cirurgiasAnteriores);
    // E assim por diante para as outras listas suspensas
    const motivos_str = this.motivos.join(' ');
    const sintomas_str = this.sintomasAdicionados.join(' ');
    const cirurgias_str = this.cirurgiasAnteriores.join(' ');
    const doencas_str = this.doencasPrevias.join(' ');
    const medicamentos_str = this.medicamentosEmUso.join(' ');
    const comportamentos_str = this.comportamentos.join(' ');
    const reproducao_str = this.reproducao.join(' ');
    const viagens_str = this.viagens.join(' ');

    const anamnese: Anamnese = {
      motivoDaConsulta: motivos_str,
      sintomas: sintomas_str,
      cirurgias: cirurgias_str,
      doencas: doencas_str,
      medicamentos: medicamentos_str,
      comportamento: comportamentos_str,
      reproducao: reproducao_str,
      viagem: viagens_str,
      dataCriacao : format(new Date(), 'dd/MM/yyyy'),
      pet_id: this.cliente.id
    };

    console.log("Cadastrando")
    console.log(motivos_str)
    console.log(anamnese.dataCriacao)
    this.anamneseService.cadastrarAnamnese(this.id, anamnese).subscribe(
      response => {
        console.log('Anamnese cadastrada com sucesso', response);
        this.openSuccessDialog('Anamnese cadastrada com sucesso!');
        this.getAnamnesesByPetId(this.id);
      },
      error => {
        console.error('Erro ao cadastrar anamnese', error);
      }
    );

  }

  ngAfterViewInit(): void {
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


  adicionarMotivo(): void {
    if (this.motivosSelecionada) {
      this.motivos.push(this.motivosSelecionada);
      this.motivosSelecionada = '';
    }
  }

  removerMotivo(motivos: string): void {
    const index = this.motivos.indexOf(motivos);
    if (index !== -1) {
      this.motivos.splice(index, 1);
    }
  }

}


