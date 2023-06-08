import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../User';

import { Component, OnInit, AfterViewInit,ViewChild,ElementRef  } from '@angular/core';
import { Chart } from 'chart.js';
import { ClientesService } from 'src/app/clientes.service';

@Component({
  selector: 'app-cliente-atendimento',
  templateUrl: './cliente-atendimento.component.html',
  styleUrls: ['./cliente-atendimento.component.css']
})

export class ClienteAtendimentoComponent implements OnInit,AfterViewInit {
  @ViewChild('myAreaChart', { static: false }) areaChartRef!: ElementRef;
  areaChart!: Chart;
  cliente: User = new User;
  iD !: number; 
  
  constructor(private route: ActivatedRoute,private router: Router,private service : ClientesService) {}


  async ngOnInit():  Promise<void>{
    if (history.state && history.state.cliente) {
      this.cliente = history.state.cliente;
    }
    const par : string =  this.route.snapshot.paramMap.get('id') as string;
    this.iD  =  parseInt(par);
    await this.getClienteById(this.iD);
  }


  ngAfterViewInit(): void {
    // Area Chart Example
    const areaChartCtx = this.areaChartRef.nativeElement.getContext('2d');

    // Area Chart Example
    const areaChartData = {
      labels: ['Janeiro/2022','Março/2023', 'Abril/2023', 'Dezembro/2023'],
      datasets: [{
        label: 'Evolução do peso',
        data: [23, 30, 24, 28],
        backgroundColor: 'rgba(78, 115, 223, 0.05)',
        borderColor: 'rgba(78, 115, 223, 1)',
        borderWidth: 1
      }]
    };
    
    this.areaChart = new Chart(areaChartCtx, {
      type: 'line',
      data: areaChartData,
      options: {
        maintainAspectRatio: false // Add this option to make the chart responsive
      }
    });
  }
  voltarParaClientes() {
    this.router.navigate(['/clientes-lista']);
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
}
