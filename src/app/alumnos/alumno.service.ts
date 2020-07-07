import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Alumno, AlumnoRegistro } from './alumno';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EstatusUsuario } from '../catalogos/catalogos';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private get_urlEndpoint: string='http://localhost:8080/api/alumnos';
  private post_urlEndpoint: string='http://localhost:8080/api/registra-alumno';
  private put_urlEndpoint: string='http://localhost:8080/api/modifica-alumno';
  private delete_urlEndpoint: string='http://localhost:8080/api/elimina-alumno';

  private estatus_urlEndpoint: string ='http://localhost:8080/api/estatus-usuario';

  private httpHeaders:HttpHeaders= new HttpHeaders({
    'Content-type':'application/json'
  });
  constructor(private http: HttpClient, private router:Router) { }

  getEstatus():Observable<EstatusUsuario[]>{
    return this.http.get<EstatusUsuario[]>(this.estatus_urlEndpoint,{headers:this.httpHeaders});
  }

  getAlumnos(): Observable<Alumno[]>{
    return this.http.get(this.get_urlEndpoint).pipe(
      map( response => response as Alumno[])
    );
  }

  getAlumno(id:number): Observable<Alumno>{
    return this.http.get<Alumno>(`${this.get_urlEndpoint}/${id}`).pipe(
      catchError(e =>{
        this.router.navigate(['/alumnos']);
        Swal.fire('Error', e.error.mensaje,'error');
        return throwError(e);
      })
    );
  }

  create(alumno:Alumno):Observable<Alumno>{
    return this.http.post<Alumno>(this.post_urlEndpoint, alumno, {headers: this.httpHeaders}).pipe(
      catchError(e=>{
        let strError:string='';
        if(e.error.error.includes('Duplicate'))
          strError='Nombre de usuario no disponible. Favor de seleccionar otro';
        Swal.fire('Error',e.error.mensaje + ": " + strError,'error');
        return throwError(e);
      })
    )
  }

  update(alumno:Alumno):Observable<Alumno>{
    return this.http.put<Alumno>(`${this.put_urlEndpoint}/${alumno.matricula}`, alumno, {headers:this.httpHeaders}).pipe(
      catchError(e=>{
        Swal.fire('Error',e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  delete(matricula:number):Observable<Alumno>{
    return this.http.delete<Alumno>(`${this.delete_urlEndpoint}/${matricula}`,{headers: this.httpHeaders});
  }
}
