import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Maestro } from './maestro';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { EstatusUsuario, TipoProfesor } from '../catalogos/catalogos';
import { InicioService } from '../inicio/inicio.service';
@Injectable({
  providedIn: 'root'
})
export class MaestroService {

  private get_urlEndpoint:string = 'http://localhost:8080/api/maestros';
  private post_urlEndpoint:string = 'http://localhost:8080/api/registra-maestro';
  private put_urlEndpoint:string = 'http://localhost:8080/api/modifica-maestro';
  private delete_urlEndpoint:string = 'http://localhost:8080/api/elimina-maestro';
  private estatus_urlEndpoint:string = 'http://localhost:8080/api/estatus-usuario';
  private tipo_urlEndpoint:string = 'http://localhost:8080/api/tipo-profesor';
  private httpHeaders:HttpHeaders= new HttpHeaders({
    'Content-type':'application/json'
  });

  constructor(private http:HttpClient, private router:Router, private inicioService:InicioService) { }

  private addAuthHeaders(){
    let token = this.inicioService.token;
    if(token!=null){
      return this.httpHeaders.append('Authorization','Bearer ' + token);
    }
    else
      return this.httpHeaders;
  }

  getMaestros(): Observable<Maestro[]>{
    return this.http.get<Maestro[]>(this.get_urlEndpoint, {headers:this.addAuthHeaders()}).pipe(
      catchError(e =>{
        Swal.fire('Error',e.error.error, 'error');
        this.router.navigate(['/principal']);
        return throwError(e);
      })
    );
  }

  getMaestro(id:number): Observable<Maestro>{
    return this.http.get<Maestro>(`${this.get_urlEndpoint}/${id}`,{headers:this.addAuthHeaders()}).pipe(
      catchError(e =>{
        Swal.fire('Error',e.error.error, 'error');
        this.router.navigate(['/principal']);
        return throwError(e);
      })
    );
  }

  create(maestro:Maestro):Observable<Maestro>{
    return this.http.post<Maestro>(this.post_urlEndpoint, maestro, {headers:this.addAuthHeaders()}).pipe(
      catchError(e =>{
        Swal.fire('Error',e.error.mensaje, 'error');
        this.router.navigate(['/principal']);
        return throwError(e);
      })
    )
  }
  
  update(maestro:Maestro):Observable<Maestro>{
    return this.http.put<Maestro>(`${this.put_urlEndpoint}/${maestro.numeroEmpleado}`,maestro,{headers:this.addAuthHeaders()}).pipe(
      catchError(e =>{
        Swal.fire('Error',e.error.mensaje, 'error');
        this.router.navigate(['/principal']);
        return throwError(e);
      })
    );
  }

  delete(numeroEmpleado:number):Observable<Maestro>{
    return this.http.delete<Maestro>(`${this.delete_urlEndpoint}/${numeroEmpleado}`,{headers:this.addAuthHeaders()}).pipe(
      catchError(e =>{
        Swal.fire('Error',e.error.mensaje, 'error');
        this.router.navigate(['/principal']);
        return throwError(e);
      })
    );
  }

  getEstatus():Observable<EstatusUsuario[]>{
    return this.http.get<EstatusUsuario[]>(this.estatus_urlEndpoint,{headers:this.httpHeaders});
  }

  getTipo():Observable<TipoProfesor[]>{
    return this.http.get<TipoProfesor[]>(this.tipo_urlEndpoint,{headers:this.httpHeaders});
  }
}
