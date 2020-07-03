import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Maestro } from './maestro';
import { MaestroService } from './maestro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-maestro-form',
  templateUrl: './maestro-form.component.html',
  styleUrls: ['./maestro-form.component.css']
})
export class MaestroFormComponent implements OnInit {

  public temp_maestro:Maestro={
    numeroEmpleado:0,
    usuario:{
      nombre:'',
      apellidoPaterno:'',
      apellidoMaterno:'',
      nombreUsuario:'',
      contrasenia:'',
      estatus:{
        id:1,
        nombre:'Activo'
      }
    },
    tipoProfesor:{
      id:1,
      nombre:'Fijo'
    }
  }
  esModificacion:boolean=false;

  constructor(private maestroService:MaestroService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.obtenerMaestro();
  }

  public create(): void{
    
    this.maestroService.create(this.temp_maestro).subscribe(response =>{
      Swal.fire('Maestro registrado','los datos han sido guardados', 'success').then(_=>{
        this.router.navigate(['/maestros']);
      });
    });
  }

  public update(): void{
    this.maestroService.update(this.temp_maestro).subscribe(response =>{
      Swal.fire('Datos de Maestros guardados','Los datos han sido modificados correctamente','success').then(_=>{
        this.router.navigate(['/maestros']);
      })
    })
  }

  public obtenerMaestro(): void{
    this.activatedRoute.params.subscribe((params) =>{
      let numeroEmpleado = params['id'];
      if(numeroEmpleado){
        this.esModificacion=true;
        this.maestroService.getMaestro(numeroEmpleado).subscribe(maestro => this.temp_maestro = maestro);
      }
      else{
        this.esModificacion=false;
        console.log('numero empleado nulo');
      }
    })
  }

}
