import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Maestro } from './maestro';
import { MaestroService } from './maestro.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { EstatusUsuario, TipoMaestro } from '../catalogos/catalogos';

@Component({
  selector: 'app-maestro-form',
  templateUrl: './maestro-form.component.html',
  styleUrls: ['./maestro-form.component.css']
})
export class MaestroFormComponent implements OnInit {

  public esModificacion:boolean=false;
  public estatusUsuario:EstatusUsuario[];
  public tipoMaestro:TipoMaestro[];
  public temp_maestro:Maestro={
    numeroEmpleado:0,
    usuario:{
      nombre:'',
      apellidoPaterno:'',
      apellidoMaterno:'',
      nombreUsuario:'',
      contrasenia:'',
      estatus:{
        id:'',
        nombre:''
      }
    },
    tipoMaestro:{
      id:'',
      tipoNombre:''
    }
  }

  constructor(private maestroService:MaestroService, private router:Router, private activatedRoute:ActivatedRoute, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.obtenerMaestro();
    this.obtenerEstatus();
    this.obtenerTipo();
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
      this.tipoMaestro = res;
    });
  }

  private AsignarEstatus():void{
    var e = (document.getElementById("inputEstatus")) as HTMLSelectElement;
    var sel = e.selectedIndex;
    var opt = e.options[sel];
    this.temp_maestro.usuario.estatus.id=opt.value;
    this.temp_maestro.usuario.estatus.nombre = opt.text;
  }
  private AsignarTipo():void{
    var e = (document.getElementById("inputTipo")) as HTMLSelectElement;
    var sel = e.selectedIndex;
    var opt = e.options[sel];
    this.temp_maestro.tipoMaestro.id=opt.value;
    this.temp_maestro.tipoMaestro.tipoNombre = opt.text;
  }
  //TODO: ver porqué está fallando el registro. (create)
  public create(): void{
    this.AsignarEstatus();
    this.AsignarTipo();
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
