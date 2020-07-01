import { Injectable } from '@angular/core';
import { Grupo } from './grupo';
@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  grupos:Grupo[]=[
    {
      id:1,
      claveMateria:'G08',
      nombreMateria:'Programación de Sistemas Móviles',
      cantidadAlumnos:20,
      estatus:1
    }
  ];
  constructor() { }

  getGrupos():Grupo[]{
    return this.grupos;
  }
}
