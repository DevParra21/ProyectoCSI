import { Component, OnInit } from '@angular/core';
import { Grupo } from './grupo';
import { GrupoService } from './grupo.service';
@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {

  grupos: Grupo[];

  constructor(private grupoService:GrupoService) { }

  ngOnInit(): void {
    this.grupos = this.grupoService.getGrupos();
  }

}
