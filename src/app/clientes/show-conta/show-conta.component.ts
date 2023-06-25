import {Component,OnInit,AfterViewInit,ViewChild,ElementRef, Inject,} from '@angular/core';
import { ClientesService } from 'src/app/clientes.service';
import { Router } from '@angular/router';
import { AnamneseService } from 'src/app/anamnese.service';

import { ChartOptions } from 'chart.js';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';

import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-show-conta',
  templateUrl: './show-conta.component.html',
  styleUrls: ['./show-conta.component.css']
})
export class ShowContaComponent implements OnInit, AfterViewInit{
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;


  constructor(
    private router: Router,
    private service: ClientesService,
    private anamneseService: AnamneseService,
    public dialogRef: MatDialogRef<ShowContaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  requisicaoEmAndamento: boolean = false;
  requisicaoConcluida: boolean = false;

  solicitarRequisicao() {
    this.requisicaoEmAndamento = true;
    console.log(this.data)
    // Simule a requisição com um atraso de 2 segundos
    setTimeout(() => {
      // Lógica da requisição aqui

      // Quando a requisição for concluída, defina requisicaoEmAndamento como false
      // e requisicaoConcluida como true
      this.requisicaoEmAndamento = false;
      this.requisicaoConcluida = true;
    }, 2000);
  }


  ngAfterViewInit(): void {
  }


  ngOnInit(): void {

  }

  closeDialog(): void {
    this.dialogRef.close();
  }




















  @ViewChild(BaseChartDirective) barChart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DatalabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Diagnósticos' }
    ]
  };

  // events
  public barChartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public barChartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }




















































}
