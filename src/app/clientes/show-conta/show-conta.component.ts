import { Pet } from '../pet';
import {Component,OnInit,AfterViewInit,ViewChild,ElementRef, Inject,} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientesService } from 'src/app/clientes.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { AnamneseService } from 'src/app/anamnese.service';
import { Chart } from 'chart.js';
import { ChartOptions } from 'chart.js';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-show-conta',
  templateUrl: './show-conta.component.html',
  styleUrls: ['./show-conta.component.css']
})
export class ShowContaComponent implements AfterViewInit{
  constructor(
    private router: Router,
    private service: ClientesService,
    private anamneseService: AnamneseService,
    public dialogRef: MatDialogRef<ShowContaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngAfterViewInit(): void {
    this.mostrarDiagnostico()
  }

  createPieChart(ctx: CanvasRenderingContext2D): void {
    new Chart(ctx, {
      type: 'pie',
      data: {
        datasets: [
          {
            data: [10, 20, 30],
            backgroundColor: ['red', 'yellow', 'blue'],
          },
        ],
        labels: ['Red', 'Yellow', 'Blue'],
      },
    });
  }

  createBarChart(ctx: CanvasRenderingContext2D): void {
    const options: ChartOptions<'bar'> = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: false, // Oculta a legenda
        },
      },
    };
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Label 1', 'Label 2', 'Label 3'],
        datasets: [
          {
            label: 'Dados do gráfico de barras',
            data: [50, 100, 75],
            backgroundColor: ['red', 'yellow', 'blue'],
            borderColor: ['red', 'yellow', 'blue'],
          },
        ],
      },
      options: options,
    });
}

  
  mostrarDiagnostico() {
    const canvasPie = document.getElementById('myChart') as HTMLCanvasElement;
    const canvasBar = document.getElementById('barChart') as HTMLCanvasElement;
    const ctxPie = canvasPie.getContext('2d');
    const ctxBar = canvasBar.getContext('2d');
    
    if (ctxPie && ctxBar) {
      this.createPieChart(ctxPie);
      this.createBarChart(ctxBar);
    } else {
      console.error('Failed to get the 2D rendering context for the canvas element');
    }
  }
  
  closeDialog(): void {
    this.dialogRef.close();
  }
}
