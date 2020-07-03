import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Alumno, AlumnoRegistro } from './alumno';
import { AlumnoService } from './alumno.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-alumno-form',
  templateUrl: './alumno-form.component.html',
  styleUrls: ['./alumno-form.component.css']
})
export class AlumnoFormComponent implements OnInit {

  @Input() matricula:number;
  
  public temp_alumno:Alumno={
    matricula:0,
    usuario:{
      apellidoMaterno:'',
      apellidoPaterno:'',
      nombre:'',
      nombreUsuario:'',
      contrasenia:'',
      estatus:{
        id:1,
        nombre:''
      }
    },
  };

  public modificacion:boolean=false;
  

  constructor(private alumnoService: AlumnoService, private router:Router, private activatedRoute:ActivatedRoute) {
    
    
   }

  ngOnInit(): void {
    this.obtenerAlumno();
  }

  public obtenerAlumno():void{
    console.log('buscar matricula en ruta anterior');
     this.activatedRoute.params.subscribe(params =>{
       console.log('entró al proceso');
       let matricula = params['id'];
       if(matricula){
        console.log('obteniendo datos...');
        this.modificacion=true;
        this.alumnoService.getAlumno(matricula).subscribe((alumno) => this.temp_alumno = alumno);
       }
       else{
         this.modificacion=false;
         console.log('matricula nullo');
       }
     });
  }

  public create(): void{
    this.alumnoService.create(this.temp_alumno).subscribe(response =>{
      swal.fire('Alumno registrado', 
      'El nuevo registro ha sido dado de alta', 
      'success').then(_=>{
        this.router.navigate(['/alumnos']);
      });
    });
  }

  public update():void{
    this.alumnoService.update(this.temp_alumno).subscribe(response =>{
      swal.fire('Alumno modificado',
        'El registro ha sido modificado',
        'success').then(_=>{
          this.router.navigate(['/alumnos']);
        });
    });
  }

}
