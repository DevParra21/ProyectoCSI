import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Maestro } from './maestro';
import { MaestroService } from './maestro.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { EstatusUsuario, TipoProfesor } from '../catalogos/catalogos';

@Component({
  selector: 'app-maestro-form',
  templateUrl: './maestro-form.component.html',
  styleUrls: ['./maestro-form.component.css']
})
export class MaestroFormComponent implements OnInit {

  public esModificacion:boolean=false;
  public estatusUsuario:EstatusUsuario[];
  public tipoProfesor:TipoProfesor[];
  public temp_maestro:Maestro={
    numeroEmpleado:null,
    usuario:{
      nombre:'',
      apellidoPaterno:'',
      apellidoMaterno:'',
      nombreUsuario:'',
      contrasenia:'',
      estatus:undefined
    },
    tipoProfesor:undefined
  }

  constructor(private maestroService:MaestroService, private router:Router, private activatedRoute:ActivatedRoute, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.obtenerMaestro();
    this.obtenerTipo();
    this.obtenerEstatus();
    setTimeout(_=>{
      this.spinner.hide();
    },1500);
  }

  public obtenerEstatus():void{
    this.maestroService.getEstatus().subscribe(res =>{
      this.estatusUsuario = res;
    });
  }

  public obtenerTipo():void{
    this.maestroService.getTipo().subscribe(res =>{
      console.log("obtenerTipo()");
      console.log(res);
      this.tipoProfesor = res;
    });
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

  public compararEstatus(est1:EstatusUsuario, est2:EstatusUsuario){
    if(est1 === undefined && est2 === undefined){
      return true;
    }
    return est1==null || est2 == null ? false : est1.id === est2.id;
  }

  public compararTipos(tipo1:TipoProfesor, tipo2:TipoProfesor){
    if(tipo1 === undefined && tipo2 === undefined){
      return true;
    }
    return tipo1==null || tipo2 == null  ? false : tipo1.id === tipo2.id;
  }

}
