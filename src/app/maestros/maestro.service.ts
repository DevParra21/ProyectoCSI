import { Injectable } from '@angular/core';
import { Maestro } from './maestro';
@Injectable({
  providedIn: 'root'
})
export class MaestroService {

  maestros: Maestro[]=[
    {
      noEmpleado:'12344',
      nombreUsuario:'mPatricio',
      contrasenia:'abc1',
      nombre:'Patricio',
      apPaterno:'Parra',
      apMaterno:'Escudero',
      tipo:1,
      estatus:1
    },
    {
      noEmpleado:'22331',
      nombreUsuario:'mLorena',
      contrasenia:'opq21',
      nombre:'Lorena',
      apPaterno:'Sandoval',
      apMaterno:'Mendoza',
      tipo:1,
      estatus:1
    }
  ];

  constructor() { }

  getMaestros(): Maestro[]{
    return this.maestros;
  }
}
