import { Component, OnInit } from '@angular/core';
import { Materia } from './materia';
import { MateriaService } from './materia.service';
import Swal from 'sweetalert2';
import { InicioService } from '../inicio/inicio.service';
import { Usuario } from '../inicio/inicio';
import { Router } from '@angular/router';
@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {

  materias:Materia[];
  usuario:Usuario;
  constructor(private materiaService: MateriaService, private inicioService:InicioService,private router:Router) {}

  ngOnInit(): void {
    if(!this.inicioService.isAuthenticated()){
      Swal.fire('Error','Es necesario iniciar sesión para visitar este recurso','error');
      this.router.navigate(['/inicio']);
      return;
    }
    this.materiaService.getMaterias().subscribe( res => {
      this.materias = res;
      console.log(res);
    });
  }

  delete(materia:Materia):void{
    Swal.fire({
      title: 'Eliminación de Materia',
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
        console.log(materia);
        this.materiaService.delete(materia.id).subscribe(response =>{
          this.materias = this.materias.filter(mat => mat !== materia)
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
