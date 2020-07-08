import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GrupoService } from './grupo.service';
import { Grupo } from './grupo';
import { Materia } from '../materias/materia';

@Component({
  selector: 'app-grupo-form',
  templateUrl: './grupo-form.component.html',
  styleUrls: ['./grupo-form.component.css']
})
export class GrupoFormComponent implements OnInit {

  public temp_grupo:Grupo={
    id:null,
    cantidadAlumnos:0,
    materia:undefined,
    estatusGrupo:{
      id:1,
      nombreEstatus:'Disponible'
    }
  }

  public materias:Materia[] = undefined;

  constructor(private grupoService:GrupoService, private router:Router, private activatedRoute:ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    this.obtenerGrupo();
    this.obtenerMaterias();
  }

  public create(): void{
    this.grupoService.create(this.temp_grupo).subscribe(response =>{
      this.router.navigate(['/grupos']);
    });
  }

  public update(): void{
    this.grupoService.update(this.temp_grupo).subscribe(response =>{
      this.router.navigate(['/grupos']);
    });
  }

  public obtenerMaterias():void{
    this.grupoService.getMaterias().subscribe(res => {
      console.log(res);
      this.materias = res;
      console.log('Materias: ' + this.materias);
    });
  }

  public obtenerGrupo(): void{
    this.activatedRoute.params.subscribe(params =>{
      let idGrupo = params['id'];
      if(idGrupo){
        this.grupoService.getGrupo(idGrupo).subscribe(grupo => this.temp_grupo = grupo);
      }
      else{
        console.log('idGrupo is null');
      }
    })
  }

  public compararMaterias(mat1:Materia, mat2:Materia):boolean{
    console.log("comparacion");
    if(mat1===undefined && mat2===undefined){
      console.log("sí entró");
      return true;
    }
    console.log("no entró");
    return mat1==null || mat2==null ? false : mat1.id === mat2.id;
  }

  

}
