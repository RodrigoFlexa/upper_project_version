import { Component, OnInit, AfterViewInit,ViewChild,ElementRef  } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('myAreaChart', { static: false }) areaChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('myBarChart', { static: false }) barChartRef!: ElementRef<HTMLCanvasElement>;
  areaChart!: Chart;
  barChart!: Chart;

  constructor() {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    // Area Chart Example
    const areaChartCtx = this.areaChartRef.nativeElement.getContext('2d');
    if (!areaChartCtx) return;

    // Bar Chart Example
    const barChartCtx = this.barChartRef.nativeElement.getContext('2d');
    if (!barChartCtx) return;

    // Area Chart Data
    const areaChartData = {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
      datasets: [{
        label: 'Faturamento Mensal',
        data: [10000, 20000, 30000, 25000, 35000, 50000, 40000],
        backgroundColor: '#b8e300',
        borderColor: '#b8e300  ',
        borderWidth: 1
      }]
    };

    const barChartData = {
      labels: ['Gripe Canina', 'Dermatite Alérgica', 'Otite', 'Verminose', 'Fratura Óssea'],
      datasets: [
        {
          label: 'Doenças Mais Comuns',
          data: [15, 10, 8, 12, 5], // Contagem de diagnósticos de cada doença
          backgroundColor: [
            '#6fccf5',
            '#6fccf5',
            '#6fccf5',
            '#6fccf5',
            '#6fccf5'
          ],
          borderColor: [
            '#6fccf5',
            '#6fccf5',
            '#6fccf5',
            '#6fccf5',
            '#6fccf5'
          ],
          borderWidth: 1
        }
      ]
    };



    // Criar instâncias dos gráficos somente se os contextos estiverem disponíveis
    this.areaChart = new Chart(areaChartCtx, {
      type: 'line',
      data: areaChartData
    });

    this.barChart = new Chart(barChartCtx, {
      type: 'bar',
      data: barChartData
    });
  }

  ngOnInit(): void {
  }
}
