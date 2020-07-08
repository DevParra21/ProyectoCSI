import { Component, OnInit } from '@angular/core';
import { Materia } from './materia';
import { MateriaService } from './materia.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { EstatusMateria } from '../catalogos/catalogos';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-materia-form',
  templateUrl: './materia-form.component.html',
  styleUrls: ['./materia-form.component.css']
})
export class MateriaFormComponent implements OnInit {

  public estatusMaterias:EstatusMateria[];
  public temp_materia:Materia={
    id:null,
    claveMateria:'',
    nombreMateria:'',
    estatusMateria:undefined
  }

  constructor(private materiaService:MateriaService, private router:Router, private activatedRoute:ActivatedRoute, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.obtenerMateria();
    this.obtenerEstatusMateria();
    
    setTimeout(_=>{
      this.spinner.hide();
    },1000);
  }

  public create():void{
    this.materiaService.create(this.temp_materia).subscribe(response =>{
      Swal.fire('Registro de Materia','La Materia se ha registrado correctamente', 'success').then(_=>{
        this.router.navigate(['/materias']);
      });
    });
  }

  public update():void{
    this.materiaService.update(this.temp_materia).subscribe(response =>{
      Swal.fire('Modificación de Datos de Materia','Los datos se han actualizado correctamente','success').then(_=>{
        this.router.navigate(['/materias']);
      })
    })
  }

  public obtenerMateria():void{
    this.activatedRoute.params.subscribe((params) =>{
      let idMateria = params['id'];
      if(idMateria){
        this.materiaService.getMateria(idMateria).subscribe(materia => this.temp_materia = materia);
      }
      else{
        console.log('idMateria null');
      }
    });
  }

  public obtenerEstatusMateria():void{
    this.materiaService.getEstatusMateria().subscribe(res=>{
      this.estatusMaterias=res;
    });
  }

  public compararEstatus(est1:EstatusMateria, est2:EstatusMateria):boolean{
    console.log("comparacion");
    if(est1===undefined && est2===undefined){
      console.log("sí entró");
      return true;
    }
    console.log("no entró");
    return est1==null || est2==null ? false : est1.id === est2.id;
  }
}
