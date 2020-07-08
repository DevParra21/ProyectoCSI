import { Component, OnInit } from '@angular/core';
import { Usuario } from './inicio';
import { InicioService } from './inicio.service';
import {HeaderComponent} from '../header/header.component';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  user:Usuario;

  constructor(private inicioService:InicioService, private router:Router, private spinner:NgxSpinnerService) { 
    this.user = new Usuario;
  }

  ngOnInit(): void {
    if(this.inicioService.isAuthenticated()){
      this.router.navigate(['/principal']);
    }
  }

  login():void{
    this.spinner.show();
    if(this.user.nombreUsuario == null || this.user.contrasenia == null)
    {
      Swal.fire('Error','El nombre de usuario y contraseña son requeridos','error');
      this.spinner.hide();
      return;
    }
    // console.log(this.user);
    this.inicioService.login(this.user).subscribe(response =>{
      // console.log(response);
      let payload = JSON.parse(atob(response.access_token.split('.')[1]));
      // console.log(payload);
      this.inicioService.guardarUsuario(response.access_token);
      this.inicioService.guardarToken(response.access_token);
      let usuario = this.inicioService.usuario;
      // console.log(usuario);
      setTimeout(_=>{
        this.spinner.hide();
      },1000);
      this.router.navigate(['/principal']);
    },errors =>{
      if(errors.status==400){
        this.spinner.hide();
        Swal.fire('Error al iniciar sesión','el nombre de usuario y contraseña no coinciden','error');
      }
    });
  }

}
