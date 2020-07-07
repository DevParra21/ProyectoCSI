import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Alumno } from './alumno'
import { AlumnoService } from './alumno.service';
import { NgxSpinnerService} from 'ngx-spinner';


@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {
 
  alumnos: Alumno[];

  constructor(private alumnoService: AlumnoService, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    
    this.alumnoService.getAlumnos().subscribe(res => this.alumnos =  res );


    setTimeout(_=>{
      this.spinner.hide();
    },1000);
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
          );
        });
      }
    });
  }
}
