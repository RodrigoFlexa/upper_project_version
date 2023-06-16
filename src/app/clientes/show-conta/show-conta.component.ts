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

  
  ngAfterViewInit(): void {
    this.mostrarDiagnostico();
  }


  ngOnInit(): void {
    this.mostrarDiagnostico();
  }
  

  // createPieChart(ctx: CanvasRenderingContext2D): void {
  //   new Chart(ctx, {
  //     type: 'pie',
  //     data: {
  //       datasets: [
  //         {
  //           data: [10, 20, 30],
  //           backgroundColor: ['red', 'yellow', 'blue'],
  //         },
  //       ],
  //       labels: ['Red', 'Yellow', 'Blue'],
  //     },
  //   });
  // }

  // createBarChart(ctx: CanvasRenderingContext2D): void {
  //   const options: ChartOptions<'bar'> = {
  //     scales: {
  //       y: {
  //         beginAtZero: true,
  //       },
  //     },
  //     plugins: {
  //       legend: {
  //         display: false, // Oculta a legenda
  //       },
  //     },
  //   };
  //   new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //       labels: ['Label 1', 'Label 2', 'Label 3'],
  //       datasets: [
  //         {
  //           label: 'Dados do gráfico de barras',
  //           data: [50, 100, 75],
  //           backgroundColor: ['red', 'yellow', 'blue'],
  //           borderColor: ['red', 'yellow', 'blue'],
  //         },
  //       ],
  //     },
  //     options: options,
  //   });
// }

  
  mostrarDiagnostico() {
    const canvasPie = document.getElementById('myChart') as HTMLCanvasElement;
    const canvasBar = document.getElementById('barChart') as HTMLCanvasElement;
    const ctxPie = canvasPie.getContext('2d');
    const ctxBar = canvasBar.getContext('2d');
    
    if (ctxPie && ctxBar) {
      // this.createPieChart(ctxPie);
      // this.createBarChart(ctxBar);
    } else {
      console.error('Failed to get the 2D rendering context for the canvas element');
    }
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
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    ]
  };

  // events
  public barChartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public barChartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40 ];

    this.barChart?.update();
  }





























































   // Pie
   public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [ [ 'Download', 'Sales' ], [ 'In', 'Store', 'Sales' ], 'Mail Sales' ],
    datasets: [ {
      data: [ 300, 500, 100 ]
    } ]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [ DatalabelsPlugin ];

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  changeLabels(): void {
    const words = [ 'hen', 'variable', 'embryo', 'instal', 'pleasant', 'physical', 'bomber', 'army', 'add', 'film',
      'conductor', 'comfortable', 'flourish', 'establish', 'circumstance', 'chimney', 'crack', 'hall', 'energy',
      'treat', 'window', 'shareholder', 'division', 'disk', 'temptation', 'chord', 'left', 'hospital', 'beef',
      'patrol', 'satisfied', 'academy', 'acceptance', 'ivory', 'aquarium', 'building', 'store', 'replace', 'language',
      'redeem', 'honest', 'intention', 'silk', 'opera', 'sleep', 'innocent', 'ignore', 'suite', 'applaud', 'funny' ];
    const randomWord = () => words[Math.trunc(Math.random() * words.length)];
    this.pieChartData.labels = new Array(3).map(_ => randomWord());

    this.chart?.update();
  }

  addSlice(): void {
    if (this.pieChartData.labels) {
      this.pieChartData.labels.push([ 'Line 1', 'Line 2', 'Line 3' ]);
    }

    this.pieChartData.datasets[0].data.push(400);

    this.chart?.update();
  }

  removeSlice(): void {
    if (this.pieChartData.labels) {
      this.pieChartData.labels.pop();
    }

    this.pieChartData.datasets[0].data.pop();

    this.chart?.update();
  }

  changeLegendPosition(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.position = this.pieChartOptions.plugins.legend.position === 'left' ? 'top' : 'left';
    }

    this.chart?.render();
  }

  toggleLegend(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.display = !this.pieChartOptions.plugins.legend.display;
    }

    this.chart?.render();
  }
}
