export class Alumno {
    matricula:number;
    usuario:{
        estatus:{
            id:number;
            nombre:string;
        };
        nombre:string;
        apellidoPaterno:string;
        apellidoMaterno:string;
        nombreUsuario:string;
        contrasenia:string;
    };
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
