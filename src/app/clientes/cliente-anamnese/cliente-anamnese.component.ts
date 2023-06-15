import { Anamnese } from './../anamnese';
import {Component,OnInit,AfterViewInit,ViewChild, ElementRef,} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from 'src/app/clientes.service';
import { User } from '../user';
import { AnamneseService } from 'src/app/anamnese.service';
import { Chart } from 'chart.js';
import { ChartOptions } from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { format } from 'date-fns';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {MatAutocomplete,MatAutocompleteModule,} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ShowContaComponent } from '../show-conta/show-conta.component';

@Component({
  selector: 'app-cliente-anamnese',
  templateUrl: './cliente-anamnese.component.html',
  styleUrls: ['./cliente-anamnese.component.css'],
})
export class ClienteAnamneseComponent implements OnInit, AfterViewInit {
  //Inicializações da api
  cliente: User = new User();
  id!: number;
  anamneses: Anamnese[] = [];

  //Gráficos Suporte ao diagnóstico
  suporteDiagnosticoAtivado: boolean = false;
  chartCreated: boolean = false;
  chartCardActivated: boolean = false;

  //Sintomas e seu autocomplete
  @ViewChild('auto') sintomasMatAutocomplete: MatAutocomplete | undefined;
  sintomasAdicionados: string[] = [];
  sintomaSelecionado: string = '';
  sintomaControl = new FormControl();
  filteredSintomas!: Observable<string[]>;
  sintomas_sugestoes: string[] = ['dificuldade para comer', 'mudança de hábitos alimentares', 'gengivas em sangue', 'hálito com odor forte', 'mudança de comportamento', 'perda de dentes', 'febre', 'mastigar apenas num lado da boca', 'perda de peso', 'convulsões', 'úlceras no focinho', 'ganho de peso', 'dificuldade de engolir', 'edema', 'apatia', 'sangramento na pele', 'secreções oculares', 'salivação abundante', 'secreções nasais', 'aumento do volume de urina', 'prostração', 'espirros', 'diarreia', 'falta de coordenação', 'perda de apetite', 'rigidez nos músculos', 'desmaio', 'fraqueza', 'dificuldade em respirar', 'isolamento', 'urina escura', 'aumento da ingestão de água', 'espasmos musculares', 'úlceras bucais', 'úlceras na boca', 'diarreia sanguinolenta', 'desidratação', 'tosse', 'mau hálito', 'saliva com sangue', 'fotofobia', 'tremores', 'vômito', 'inquietação', 'agressividade', 'dentes fraturados', 'anemia', 'tiques nervosos', 'paralisia']
  private _filterSintomas(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.sintomas_sugestoes.filter((sintoma: string) =>
      sintoma.toLowerCase().includes(filterValue)
    );
  }

  //Inicialização dos forms
  motivos: string[] = [];
  motivosSelecionada: string = '';
  //Inicialização dos forms
  cirurgiasAnteriores: string[] = [];
  cirurgiaSelecionada: string = '';


  @ViewChild('doencasAuto') doencasMatAutocomplete: MatAutocomplete | undefined;

  doencasPrevias: string[] = [];
  doencaPreviaSelecionada: string = '';
  doencasControl = new FormControl();
  filteredDoencas!: Observable<string[]>;
  doencas_sugestoes: string[] = ['Parvovirose', 'Cinomose', 'Leptospirose', 'Raiva', 'Doença periodontal', 'insuficiencia renal', 'Giardía', 'doença do carrapato', 'Doença cardíaca']
  private _filterDoencas(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.doencas_sugestoes.filter((doenca: string) =>
      doenca.toLowerCase().includes(filterValue)
    );
  }

  medicamentosEmUso: string[] = [];
  medicamentoSelecionado: string = '';

  comportamentos: string[] = [];
  comportamentoSelecionado: string = '';

  reproducao: string[] = [];
  reproducaoSelecionada: string = '';

  viagens: string[] = [];
  viagemSelecionada: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ClientesService,
    private anamneseService: AnamneseService,
    private dialog: MatDialog,
    private conta_dialog: MatDialog
  ) { }

  async ngOnInit(): Promise<void> {
    if (history.state && history.state.cliente) {
      this.cliente = history.state.cliente;
    }
    const par: string = this.route.snapshot.paramMap.get('id') as string;
    this.id = parseInt(par);
    await this.getClienteById(this.id);
    await this.getAnamnesesByPetId(this.id);

    this.filteredSintomas = this.sintomaControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterSintomas(value))
    );

    this.filteredDoencas = this.doencasControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterDoencas(value))
    );
  }

  openDialog(): void {
    const data = {
      motivos: this.motivos.join(' '),
      sintomas: this.sintomasAdicionados.join(' '),
      cirurgias: this.cirurgiasAnteriores.join(' '),
      doencas: this.doencasPrevias.join(' '),
      medicamentos: this.medicamentosEmUso.join(' '),
      comportamentos: this.comportamentos.join(' '),
      reproducao: this.reproducao.join(' '),
      viagens: this.viagens.join(' ')
    };

    const dialogRef = this.dialog.open(ShowContaComponent, {
      width: '900px',
      height: '700px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      // Lógica a ser executada após o fechamento do diálogo, se necessário
    });
  }

  async getClienteById(MeuId: number) {
    this.service.getClienteById(MeuId).subscribe(
      (resposta: User) => {
        this.cliente = resposta;
      },
      (error) => {
        console.error('Erro ao obter o cliente:', error);
      }
    );
  }

  async getAnamnesesByPetId(id: number) {
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

  ativarSuporteDiagnostico() {

    const preenchido = this.fichaAnamnesePreenchida();
    if(preenchido){
      this.openDialog()
    }else {
      alert(
        'Por favor, preencha a ficha de anamnese por completo'
      );
    }
  }

  openSuccessDialog(message: string): void {
    const data = {
      motivos: this.motivos.join(' '),
      sintomas: this.sintomasAdicionados.join(' '),
      cirurgias: this.cirurgiasAnteriores.join(' '),
      doencas: this.doencasPrevias.join(' '),
      medicamentos: this.medicamentosEmUso.join(' '),
      comportamentos: this.comportamentos.join(' '),
      reproducao: this.reproducao.join(' '),
      viagens: this.viagens.join(' '),
      message: message
    };

    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      width: '400px',
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
            this.ativarSuporteDiagnostico();
     }
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

  cadastrarAnamnese() {
    if (this.fichaAnamnesePreenchida()) {
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
        dataCriacao: format(new Date(), 'dd/MM/yyyy'),
        pet_id: this.cliente.id,
      };

      this.anamneseService.cadastrarAnamnese(this.id, anamnese).subscribe(
        (response) => {
          console.log('Anamnese cadastrada com sucesso', response);
          this.openSuccessDialog('Anamnese cadastrada com sucesso!');
          this.getAnamnesesByPetId(this.id);
        },
        (error) => {
          console.error('Erro ao cadastrar anamnese', error);
        }
      );
    } else {
      alert(
        'Por favor, preencha a ficha de anamnese por completo'
      );
    }
  }

  voltarPraatendimento(cliente: User) {
    this.router.navigate(['/cliente', cliente.id], { state: { cliente } });
  }

  ngAfterViewInit() { }

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
