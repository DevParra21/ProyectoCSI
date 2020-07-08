import { Component, OnInit } from '@angular/core';
import { InicioService } from '../inicio/inicio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  dt: Date = new Date();
  datetime: String = this.dt.toLocaleString();
  constructor(public inicioService:InicioService, private router:Router) {
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

  logout():void{
    this.inicioService.logout();
    this.router.navigate(['/inicio']);
  }
}
