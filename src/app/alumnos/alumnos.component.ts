import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Alumno } from './alumno'
import { AlumnoService } from './alumno.service';


@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {
 
  alumnos: Alumno[];

  constructor(private alumnoService: AlumnoService) { }

  ngOnInit(): void {
    this.alumnoService.getAlumnos().subscribe(res => this.alumnos =  res );
    
  }

  delete(alumno:Alumno):void{
    Swal.fire({
      title: 'Eliminación de Alumno',
      text: "¿Deseas Continuar? Esta acción no será reversible.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.value) {
        this.alumnoService.delete(alumno.matricula).subscribe(response =>{
          this.alumnos = this.alumnos.filter(alu => alu !== alumno)
          Swal.fire(
            'Alumno Eliminado',
            'El registro ha sido eliminado correctamente.',
            'success'
          )
        })
      }
    })
  }

  
}
