import { Component, OnInit } from '@angular/core';
import { Grupo } from './grupo';


import { GrupoService } from './grupo.service';
import { InicioService } from '../inicio/inicio.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {

  grupos: Grupo[];

  constructor(private grupoService:GrupoService, private inicioService:InicioService, private router:Router) { }

  ngOnInit(): void {
    if(!this.inicioService.isAuthenticated()){
      Swal.fire('Error','Es necesario iniciar sesión para visitar este recurso','error');
      this.router.navigate(['/inicio']);
      return;
    }

    this.grupoService.getGrupos().subscribe( res => this.grupos = res );
  }

  delete(grupo:Grupo):void{
    Swal.fire({
      title: 'Eliminación de Grupo',
      text: "¿Deseas Continuar? Esta acción no será reversible.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.value) {
        console.log("eliminando... ");
        console.log(result);
        console.log(grupo);
        this.grupoService.delete(grupo.id).subscribe(response =>{
          this.grupos = this.grupos.filter(gru => gru !== grupo)
          Swal.fire(
            'Materia Eliminada',
            'El registro ha sido eliminado correctamente.',
            'success'
          );
        });
      }
    });
  }

}
