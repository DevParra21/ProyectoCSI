export class Grupo {
    id:number;
    materia:{
        id:number;
        claveMateria:string;
        nombreMateria:string;
    }
    estatusGrupo:{
        id:number;
        nombreEstatus:string;
    }
    cantidadAlumnos:number;
}

