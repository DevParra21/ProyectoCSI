import { Component, OnInit } from '@angular/core';
import { Materia } from './materia';
import { MateriaService } from './materia.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-materia-form',
  templateUrl: './materia-form.component.html',
  styleUrls: ['./materia-form.component.css']
})
export class MateriaFormComponent implements OnInit {

  public temp_materia:Materia={
    id:0,
    claveMateria:'',
    nombreMateria:'',
    estatusMateria:{
      id:1,
      nombreEstatus:'Activo'
    }
  }

  constructor(private materiaService:MateriaService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.obtenerMateria();
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
}
