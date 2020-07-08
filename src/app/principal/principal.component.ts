import { Component, OnInit } from '@angular/core';
import {InicioService} from '../inicio/inicio.service';
import { Usuario } from '../inicio/inicio';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  public usuario:Usuario;
  constructor(private inicioService:InicioService, private router:Router) {
    this.usuario = this.inicioService.usuario;
   }

  ngOnInit(): void {
    if(!this.inicioService.isAuthenticated()){
      Swal.fire('Error de acceso','Es necesario iniciar sesión para visitar este recurso','error');
      this.router.navigate(['/inicio']);
    }
  }

}
