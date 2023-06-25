import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChartData, ChartEvent, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ClientesService } from 'src/app/clientes.service';
import { AnamneseService } from 'src/app/anamnese.service';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { max } from 'date-fns';

@Component({
  selector: 'app-show-conta',
  templateUrl: './show-conta.component.html',
  styleUrls: ['./show-conta.component.css']
})
export class ShowContaComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  requisicaoEmAndamento: boolean = false;
  requisicaoConcluida: boolean = false;
  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Diagnósticos' }
    ]
  };
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0,
        max :100
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'center',
        align: 'center',
        // padding: {
        //   top: 20
        // }
      }
    }
  };
  barChartType: ChartType = 'bar';
  barChartPlugins = [DatalabelsPlugin];
  maiorProbabilidade: number = 0;
  doenca: string = '';
  nomePet: string = '';

  constructor(
    private router: Router,
    private service: ClientesService,
    private anamneseService: AnamneseService,
    public dialogRef: MatDialogRef<ShowContaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  solicitarRequisicao() {
    this.requisicaoEmAndamento = true;

    const anamneseId = this.data.id;

    this.anamneseService.getConta(anamneseId).subscribe(
      dados => {
        const preDiagnostico = dados['pre-diagnostico'];
        const nomePet = dados.pet.nome;

        if (preDiagnostico && preDiagnostico.length > 0) {
          const uniquePreDiagnostico = this.getUniquePreDiagnostico(preDiagnostico);

          const labels = uniquePreDiagnostico.map((item: { doenca: any; }) => item.doenca);
          const data = uniquePreDiagnostico.map((item: { porcentagem: any; }) => item.porcentagem);

          this.barChartData = {
            labels: labels,
            datasets: [
              { data: data, label: 'Diagnósticos' }
            ]
          };

          const maiorProbabilidadeItem = uniquePreDiagnostico.reduce((prev: { porcentagem: number; }, current: { porcentagem: number; }) => (prev.porcentagem > current.porcentagem) ? prev : current);
          this.maiorProbabilidade = parseFloat(maiorProbabilidadeItem.porcentagem);
          this.doenca = maiorProbabilidadeItem.doenca;
          this.nomePet = nomePet;
        } else {
          console.log('Nenhum pré-diagnóstico encontrado.');
        }

        this.requisicaoEmAndamento = false;
        this.requisicaoConcluida = true;
      },
      error => {
        console.error(error);

        this.requisicaoEmAndamento = false;
        this.requisicaoConcluida = true;
      }
    );
  }

  private getUniquePreDiagnostico(preDiagnostico: any[]): any[] {
    const uniqueItems = new Map();

    for (const item of preDiagnostico) {
      if (!uniqueItems.has(item.doenca) || uniqueItems.get(item.doenca).porcentagem < item.porcentagem) {
        uniqueItems.set(item.doenca, item);
      }
    }
    return Array.from(uniqueItems.values());
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  barChartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {}
  barChartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {}
}
