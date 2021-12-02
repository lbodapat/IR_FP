import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VisualComponent } from './visual/visual.component';
import {ChartComponent} from './chart/chart.component'

const routes:Routes = [
  {path:'', component: HomeComponent},
  {path:'visual',component: ChartComponent}
];

@NgModule({
  exports:[RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
