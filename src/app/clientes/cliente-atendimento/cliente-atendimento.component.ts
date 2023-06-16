import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ClientesService } from 'src/app/clientes.service';
import { User } from '../user';
import { firstValueFrom } from 'rxjs';
import { Chart, ChartData, registerables } from 'chart.js';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { default as Annotation } from 'chartjs-plugin-annotation';


@Component({
  selector: 'app-cliente-atendimento',
  templateUrl: './cliente-atendimento.component.html',
  styleUrls: ['./cliente-atendimento.component.css']
})
export class ClienteAtendimentoComponent implements OnInit {
  @ViewChild('myAreaChart', { static: false }) areaChartRef!: ElementRef;
  areaChart!: Chart;
  cliente!: User;
  id !: number;
  carregando: boolean = true;
  constructor(private route: ActivatedRoute, private router: Router, private service: ClientesService) {
    Chart.register(...registerables);
    Chart.register(Annotation)
  }

  async ngOnInit(): Promise<void> {
    const par: string = this.route.snapshot.paramMap.get('id') as string;
    this.id = parseInt(par);
    this.carregando = true;
    await this.getClienteById(this.id);
  }


  async getClienteById(MeuId: number) {
    try {
      const resposta: User = await firstValueFrom(this.service.getClienteById(MeuId));
      this.cliente = resposta;
      this.carregando = false;
      console.log(this.cliente); // Verifique se o objeto cliente foi atribuído corretamente
      console.log(this.cliente.pet); // Verifique se o objeto pet está presente dentro do cliente
      console.log(this.cliente.email)
    } catch (error) {
      console.error('Erro ao obter o cliente:', error);
    }
  }








  voltarParaClientes(): void {
    this.router.navigate(['/clientes-lista']);
  }

  anamnese(cliente: User){
      this.router.navigate(['/cliente/anamnese', cliente.id], { state: { cliente } });
  }


































  private newLabel? = 'Faturamento Mensal';


  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [8, 10, 7, 7.5, 8],
        label: 'Evolução Do Peso',
        borderColor: '#820ad1',
        pointBackgroundColor: '#00bef1',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: false,
      }
    ],
    labels:  ['Janeiro/2021', 'Março/2022', 'Abril/2022', 'Dezembro/2022','Janeiro/2023']
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
