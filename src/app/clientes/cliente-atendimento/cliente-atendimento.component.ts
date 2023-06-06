import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../clientes';

import { Component, OnInit, AfterViewInit,ViewChild,ElementRef  } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-cliente-atendimento',
  templateUrl: './cliente-atendimento.component.html',
  styleUrls: ['./cliente-atendimento.component.css']
})

export class ClienteAtendimentoComponent implements OnInit,AfterViewInit {
  cliente: Cliente | undefined;

  constructor(private route: ActivatedRoute,private router: Router) {}

  ngOnInit() {
    if (history.state && history.state.cliente) {
      this.cliente = history.state.cliente;
    }
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
      data: areaChartData
    });

  }


  @ViewChild('myAreaChart', { static: false }) areaChartRef!: ElementRef;
  areaChart!: Chart;



  voltarParaClientes() {
    this.router.navigate(['/clientes-lista']);
  }

  // do_anamnese(cliente: Cliente) {
  //   this.router.navigate(['/cliente/anamnese', cliente.id], { state: { cliente } });
  // }

}
