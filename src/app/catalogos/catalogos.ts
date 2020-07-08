export class Usuario{
    nombre:string;
    apellidoPaterno:string;
    apellidoMaterno:string;
    nombreUsuario:string;
    contrasenia:string;
    estatus:EstatusUsuario;
}

export class EstatusUsuario {
    id:number;
    nombre:string;
}

export class EstatusMateria{
    id:number;
    nombreEstatus:string;
}

export class TipoProfesor{
    id:number;
    tipoNombre:string;
}
