import { Usuario } from '../catalogos/catalogos';

export class Alumno {
    matricula:number;
    usuario:Usuario;
}

export class AlumnoRegistro{
    matricula:number;
    estatus:number;
    nombre:string;
    apPaterno:string;
    apMaterno:string;
    nombreUsuario:string;
    contrasenia:string;
}
