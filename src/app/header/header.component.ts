import { Component, OnInit } from '@angular/core';
import { DayTemplateContext } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-day-template-context';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  dt: Date = new Date();
  datetime: String = this.dt.toLocaleString();
  constructor() {
    
   }

  ngOnInit(): void {
    this.updateDateTime();
  }

  updateDateTime(): void{
    setInterval(()=>{
      this.dt = new Date();
      this.datetime = this.dt.toLocaleString();
    },1000);
  }
}
