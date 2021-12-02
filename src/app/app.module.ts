import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './/app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { ChartModule } from 'angular-highcharts';
import { GoogleChartModule } from './google-chart/google-chart.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FilterComponent } from './filter/filter.component';
import { VisualComponent } from './visual/visual.component';
import { HomeComponent } from './home/home.component';
import { ChartComponent } from './chart/chart.component';
import { StopPropagationDirective } from './directives/stop-propagation.directive';
import {TweetService} from './services/tweet.service';
import {AgWordCloudModule, AgWordCloudData} from 'angular4-word-cloud';


@NgModule({
  declarations: [
    AppComponent, NavbarComponent, FilterComponent, VisualComponent, HomeComponent,ChartComponent,StopPropagationDirective
  ],
  imports: [
    GoogleChartModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    ChartModule,
    HttpClientModule,
    NgxPaginationModule,
    AgWordCloudModule.forRoot()
  ],
  providers: [TweetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
