import { Component, OnInit } from '@angular/core';
import { GoogleChartService } from  '../service/google-chart.service';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css']
})
export class WorldMapComponent implements OnInit {

  private google: any;

  

   constructor(private gChartService : GoogleChartService) { 
    this.google = this.gChartService.getGoogle();
    this.google.charts.load('current', {'packages':['geochart']});
    this.google.charts.setOnLoadCallback(this.drawRegionsMap.bind(this));

      
   }
    
   private drawRegionsMap() {

      var data = this.google.visualization.arrayToDataTable([
        ['Country', 'Popularity'],
        ['Germany', 200],
        ['United States', 300],
        ['Brazil', 400],
        ['Canada', 500],
        ['France', 600],
        ['India', 700]
      ]);

      var options = {colorAxis: {colors: ['196F3D']},},displayMode: 'text' ;

      var chart = new this.google.visualization.GeoChart(document.getElementById('divLineChart'));

      chart.draw(data, options);
    }
  ngOnInit() {
  }

}
