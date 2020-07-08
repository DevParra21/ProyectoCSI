import { Component, OnInit } from '@angular/core';
import { InicioService } from '../inicio/inicio.service';
import {NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Usuario } from '../inicio/inicio';
import { GrupoService } from '../grupos/grupo.service';
import { Observable } from 'rxjs';
import { Grupo } from '../grupos/grupo';

@Component({
  selector: 'app-inscribir-materia',
  templateUrl: './inscribir-materia.component.html',
  styleUrls: ['./inscribir-materia.component.css']
})
export class InscribirMateriaComponent implements OnInit {

  public usuario:Usuario;
  public gruposDisponibles:Grupo[];
  public gruposInscritos:Grupo[];
  constructor(private inicioService:InicioService, private router:Router, private grupoService:GrupoService, private spinner:NgxSpinnerService) { 
    this.usuario= this.inicioService.usuario;
  }

  ngOnInit(): void {

    if(!this.inicioService.isAuthenticated()){
      Swal.fire('Error de acceso','Es necesario iniciar sesión para visitar este recurso','error');
      this.router.navigate(['/inicio']);
    }
    this.spinner.show();

    this.grupoService.getGrupos().subscribe(res =>{
      this.gruposDisponibles=res;
    });

    this.grupoService.getGrupos().subscribe(res=>{
      this.gruposInscritos=res;
    })

    setTimeout(_=>{
      this.spinner.hide();
    },1000);
  }

}
