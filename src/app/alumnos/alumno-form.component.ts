import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Alumno, AlumnoRegistro } from './alumno';
import { AlumnoService } from './alumno.service';
import { NgxSpinnerService } from 'ngx-spinner';


import swal from 'sweetalert2';
import { EstatusUsuario } from '../catalogos/catalogos';

@Component({
  selector: 'app-alumno-form',
  templateUrl: './alumno-form.component.html',
  styleUrls: ['./alumno-form.component.css']
})
export class AlumnoFormComponent implements OnInit {

  @Input() matricula:number;
  public modificacion:boolean=false;
  public estatusUsuario:EstatusUsuario[];
  
  public temp_alumno:Alumno={
    matricula:null,
    usuario:{
      apellidoMaterno:'',
      apellidoPaterno:'',
      nombre:'',
      nombreUsuario:'',
      contrasenia:'',
      estatus:undefined
    },
  };

  

  constructor(private alumnoService: AlumnoService, private router:Router, private activatedRoute:ActivatedRoute, private spinner:NgxSpinnerService) {
    
    
   }

  ngOnInit(): void {
    this.spinner.show();
    this.obtenerAlumno();
    this.ObtenerEstatusUsuario();

    setTimeout(_=>{
      this.spinner.hide();
    },1500);
  }

  public ObtenerEstatusUsuario():void{
    this.alumnoService.getEstatus().subscribe(res =>{
      this.estatusUsuario = res;
    });
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
       this.spinner.hide();
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

  public compararEstatus(est1:EstatusUsuario, est2:EstatusUsuario):boolean{
    if(est1 === undefined && est2 === undefined){
      console.log("entró undefined");
      return true;
    }

    console.log("no entró undefined");
    return est1==null || est2==null ? false : est1.id===est2.id;
  }

}
