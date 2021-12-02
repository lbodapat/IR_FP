import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceModule } from './service/service.module';
import { WorldMapComponent } from './world-map/world-map.component';


@NgModule({
  imports: [
    CommonModule,
    ServiceModule
  ],
  declarations: [WorldMapComponent],
  exports: [WorldMapComponent],
  providers : []
})
export class GoogleChartModule { }
