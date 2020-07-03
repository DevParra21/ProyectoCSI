import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GrupoService } from './grupo.service';
import { Grupo } from './grupo';

@Component({
  selector: 'app-grupo-form',
  templateUrl: './grupo-form.component.html',
  styleUrls: ['./grupo-form.component.css']
})
export class GrupoFormComponent implements OnInit {

  public temp_grupo:Grupo={
    id:0,
    cantidadAlumnos:0,
    materia:{
      id:0,
      nombreMateria:'',
      claveMateria:''
    },
    estatusGrupo:{
      id:1,
      nombreEstatus:'Disponible'
    }
  }

  constructor(private grupoService:GrupoService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.obtenerGrupo();
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

  

}
