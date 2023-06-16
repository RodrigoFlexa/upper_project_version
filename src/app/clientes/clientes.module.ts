import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesRoutingModule } from './clientes-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';
import { ClienteAtendimentoComponent } from './cliente-atendimento/cliente-atendimento.component';
import { ClienteAnamneseComponent } from './cliente-anamnese/cliente-anamnese.component';
import { ClientesAddComponent } from './clientes-add/clientes-add.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { NgChartsModule } from 'ng2-charts';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { ShowContaComponent } from './show-conta/show-conta.component';

@NgModule({
  declarations: [
    ClientesListaComponent,
    ClienteAtendimentoComponent,
    ClienteAnamneseComponent,
    ClientesAddComponent,
    ConfirmDialogComponent,
    SuccessDialogComponent,
    ShowContaComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    NgChartsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatGridListModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTabsModule
    ],
  exports: [

    ClientesListaComponent
  ]
})
export class ClientesModule { }
