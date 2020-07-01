import { Injectable } from '@angular/core';

import { Alumno } from './alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  alumno: Alumno[]=[
    {
      matricula: '1607641',
      nombre: 'Patricio',
      apPaterno: 'Escudero',
      apMaterno: 'Parra',
      nombreUsuario: 'pEscudero',
      contrasenia: 'abc123',
      estatus:1
    },
    {
      matricula: '1859331',
      nombre: 'Lorena',
      apPaterno: 'Sandoval',
      apMaterno: 'Parra',
      nombreUsuario: 'lSandoval',
      contrasenia: 'cont12',
      estatus:1
    }
  ];

  constructor() { }

  getAlumnos(): Alumno[]{
    return this.alumno;
  }
}
