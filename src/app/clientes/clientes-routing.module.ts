import { ClienteAtendimentoComponent } from './cliente-atendimento/cliente-atendimento.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';
import { ClienteAnamneseComponent } from './cliente-anamnese/cliente-anamnese.component';

const routes: Routes = [
  {path:'clientes-lista',component:ClientesListaComponent},
  {path: 'cliente/:id', component: ClienteAtendimentoComponent},
  {path: 'cliente/anamnese/:id', component: ClienteAnamneseComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule {


 }
