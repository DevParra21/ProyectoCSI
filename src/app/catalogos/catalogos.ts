export class Usuario{
    nombre:string;
    apellidoPaterno:string;
    apellidoMaterno:string;
    nombreUsuario:string;
    contrasenia:string;
    estatus:EstatusUsuario;
}

export class EstatusUsuario {
    id:string;
    nombre:string;
}

export class EstatusMateria{
    id:string;
    nombreEstatus:string;
}

export class TipoMaestro{
    id:string;
    tipoNombre:string;
}
