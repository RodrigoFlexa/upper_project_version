import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  // { path: 'home', redirectTo: 'cliente/anamnese/6', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  // Outras rotas da aplicação
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}

