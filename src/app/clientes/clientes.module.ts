import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesRoutingModule } from './clientes-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';
import { ClienteAtendimentoComponent } from './cliente-atendimento/cliente-atendimento.component';
import { ClienteAnamneseComponent } from './cliente-anamnese/cliente-anamnese.component';
import { ClientesAddComponent } from './clientes-add/clientes-add.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    ClientesListaComponent,
    ClienteAtendimentoComponent,
    ClienteAnamneseComponent,
    ClientesAddComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule
  ],
  exports: [

    ClientesListaComponent
  ]
})
export class ClientesModule { }
