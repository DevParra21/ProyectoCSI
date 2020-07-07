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
    id:0,
    claveMateria:'',
    nombreMateria:'',
    estatusMateria:{
      id:'',
      nombreEstatus:''
    }
  }

  constructor(private materiaService:MateriaService, private router:Router, private activatedRoute:ActivatedRoute, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.obtenerMateria();
    this.obtenerEstatusMateria();
    
    setTimeout(_=>{
      this.spinner.hide();
    },1500);
  }

  public create():void{
    this.AsignarEstatus();
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

  private AsignarEstatus():void{
    var e = (document.getElementById("inputEstatus")) as HTMLSelectElement;
    var sel = e.selectedIndex;
    var opt = e.options[sel];
    this.temp_materia.estatusMateria.id=opt.value;
    this.temp_materia.estatusMateria.nombreEstatus = opt.text;
  }
}
