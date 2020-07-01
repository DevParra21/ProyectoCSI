import { Injectable } from '@angular/core';
import { Materia } from './materia';
@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  materias: Materia[] =[
    {
      claveMateria: 'G07',
      nombreMateria: 'Programación Avanzada',
      estatus:1
    },
    {
      claveMateria: 'B35',
      nombreMateria: 'Diseño Industrial',
      estatus:1
    },
    {
      claveMateria: 'J44',
      nombreMateria: 'Contexto Social y Emprendimiento',
      estatus:1
    }
  ];

  constructor() { }

  getMaterias(): Materia[]{
    return this.materias;
  }
}
