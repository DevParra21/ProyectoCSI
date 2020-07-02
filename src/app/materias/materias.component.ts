import { Component, OnInit } from '@angular/core';
import { Materia } from './materia';
import { MateriaService } from './materia.service';
@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {

  materias:Materia[];

  constructor(private materiaService: MateriaService) { }

  ngOnInit(): void {
    this.materiaService.getMaterias().subscribe( res => this.materias = res );
  }

}
