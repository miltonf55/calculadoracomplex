import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CircunferenciaComponent } from './circunferencia/circunferencia.component';
import { ComplexComponent } from './complex/complex.component';

const routes: Routes = [
  {path: '', component: ComplexComponent, pathMatch: 'full'},
  {path:'circunferencia', component:CircunferenciaComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
