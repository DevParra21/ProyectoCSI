import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Alumno } from './alumno';
import { InicioService } from '../inicio/inicio.service';
import Swal from 'sweetalert2';
import { EstatusUsuario } from '../catalogos/catalogos';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private get_urlEndpoint: string='http://localhost:8080/api/alumnos';
  private post_urlEndpoint: string='http://localhost:8080/api/registra-alumno';
  private put_urlEndpoint: string='http://localhost:8080/api/modifica-alumno';
  private delete_urlEndpoint: string='http://localhost:8080/api/elimina-alumno';
  private getEstatus_urlEndpoint:string = 'http://localhost:8080/api/estatus-usuario';

  private httpHeaders:HttpHeaders= new HttpHeaders({
    'Content-type':'application/json'
  });
  constructor(private http: HttpClient, private router:Router, private inicioService:InicioService) { }

  private addAuthHeaders(){
    let token = this.inicioService.token;
    if(token!=null){
      return this.httpHeaders.append('Authorization','Bearer ' + token);
    }
    else
      return this.httpHeaders;
  }

  getAlumnos(): Observable<Alumno[]>{
    return this.http.get<Alumno[]>(this.get_urlEndpoint,{headers:this.addAuthHeaders()}).pipe(
      catchError(e=>{
        Swal.fire('error',e.error.error,'error');
        this.router.navigate(['/principal']);
        return throwError(e);
      })
    );
  }

  getAlumno(id:number): Observable<Alumno>{
    return this.http.get<Alumno>(`${this.get_urlEndpoint}/${id}`,{headers:this.addAuthHeaders()}).pipe(
      catchError(e =>{
        Swal.fire('Error',e.error.mensaje,'error');
        this.router.navigate(['/principal']);
        return throwError(e);
      })
    );
  }

  create(alumno:Alumno):Observable<Alumno>{
    return this.http.post<Alumno>(this.post_urlEndpoint, alumno, {headers:this.addAuthHeaders()}).pipe(
      
      catchError(e =>{
        if(this.unauthorized(e))
          return throwError(e);
        Swal.fire('Error',e.error.error,'error');
        this.router.navigate(['/principal']);
        return throwError(e);
      })
    );
  }

  update(alumno:Alumno):Observable<Alumno>{
    return this.http.put<Alumno>(`${this.put_urlEndpoint}/${alumno.matricula}`, alumno, {headers:this.addAuthHeaders()}).pipe(
      catchError(e=>{
        Swal.fire('error',e.error.error,'error');
        this.router.navigate(['/principal']);
        return throwError(e);
      })
    );
  }

  delete(matricula:number):Observable<Alumno>{
    return this.http.delete<Alumno>(`${this.delete_urlEndpoint}/${matricula}`,{headers:this.addAuthHeaders()}).pipe(
      catchError(e=>{
        Swal.fire('error',e.error.error,'error');
        this.router.navigate(['/principal']);
        return throwError(e);
      })
    );
  }

  getEstatus():Observable<EstatusUsuario[]>{
    return this.http.get<EstatusUsuario[]>(this.getEstatus_urlEndpoint,{headers:this.httpHeaders});
  }

  private unauthorized(error):boolean{
    if(error.status===401 || error.status===403){
      this.router.navigate(['inicio']);
      return true;
    }

    return false;
  }
}
