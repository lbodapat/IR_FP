import { Component } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

export class FilterComponent {
    // private _opened: boolean = false;    
    // private _toggleSidebar() {
    //     this._opened = !this._opened;
    
    openNav() {
        document.getElementById("mySidenav").style.width = "250px";
    }
      
    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }
  }
