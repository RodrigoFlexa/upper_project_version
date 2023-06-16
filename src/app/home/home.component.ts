import { Component, OnInit, AfterViewInit,ViewChild,ElementRef  } from '@angular/core';
import { Chart, ChartData, registerables } from 'chart.js';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { default as Annotation } from 'chartjs-plugin-annotation';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor() {
    Chart.register(...registerables);
    Chart.register(Annotation)
  }
  ngOnInit(): void {
  }


























  @ViewChild(BaseChartDirective) barChart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0,
        max: 30
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
    labels: ['Gripe Canina', 'Dermatite Alérgica', 'Otite', 'Verminose', 'Fratura Óssea'],
    datasets: [
      { data: [15, 10, 20, 12, 2], label: 'Doenças mais comuns' }
    ]
  };

  // events
  public barChartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  }

  public barChartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  }









































  private newLabel? = 'Faturamento Mensal';


  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [10000, 20000, 30000, 25000, 35000, 50000, 40000],
        label: 'Faturamento Mensal',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#820ad1',
        pointBackgroundColor: '#00bef1',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho']
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.1
      }
    },
    plugins: {
      legend: { display: true }
    }
  };
  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  }
  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  }
  public hideOne(): void {
    const isHidden = this.chart?.isDatasetHidden(1);
    this.chart?.hideDataset(1, !isHidden);
  }

}
