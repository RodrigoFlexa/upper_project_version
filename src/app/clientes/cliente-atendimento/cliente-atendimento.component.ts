import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { ClientesService } from 'src/app/clientes.service';
import { User } from '../user';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-cliente-atendimento',
  templateUrl: './cliente-atendimento.component.html',
  styleUrls: ['./cliente-atendimento.component.css']
})
export class ClienteAtendimentoComponent implements OnInit, AfterViewInit {
  @ViewChild('myAreaChart', { static: false }) areaChartRef!: ElementRef;
  areaChart!: Chart;
  cliente!: User;
  id !: number;
  carregando: boolean = true;
  constructor(private route: ActivatedRoute, private router: Router, private service: ClientesService) { }

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




  // async  getClienteById(MeuId: number){
  //   try {
  //   let resposta : any = await this.service.getClienteById(MeuId).then()
  //   this.cliente.id = MeuId
  //   this.cliente.nome = resposta.nome;
  //   this.cliente.email = resposta.email;
  //   this.cliente.telefone = resposta.telefone;
  //   this.cliente.cidade = resposta.cidade;
  //   this.cliente.cep = resposta.cep;
  //   this.cliente.cpf  = resposta.cpf;
  //   this.cliente.casa = resposta.casa;

  //   this.cliente.pet.id = MeuId
  //   this.cliente.pet.nome = res
  //   this.cliente.pet.idade =
  //   this.cliente.pet.peso =
  //   this.cliente.pet.especie =
  //   this.cliente.pet.raca =
  //   this.cliente.pet.sexo =
  //   }
  //   catch (error) {
  //     console.error('Erro ao obter o cliente:', error);
  //   }
  // }



  ngAfterViewInit(): void {
    const areaChartCtx = this.areaChartRef.nativeElement.getContext('2d');
    const areaChartData = {
      labels: ['Janeiro/2022', 'Março/2023', 'Abril/2023', 'Dezembro/2023'],
      datasets: [{
        label: 'Evolução do peso',
        data: [23, 30, 24, 28],
        backgroundColor: '#820ad1',
        borderColor: '#820ad1  ',
        borderWidth: 1,
        pointBackgroundColor: '#00bef1'
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
  voltarParaClientes(): void {
    this.router.navigate(['/clientes-lista']);
  }

  anamnese(cliente: User){
      this.router.navigate(['/cliente/anamnese', cliente.id], { state: { cliente } });
  }
}
