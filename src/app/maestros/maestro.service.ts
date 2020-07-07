import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Maestro } from './maestro';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { EstatusUsuario, TipoMaestro } from '../catalogos/catalogos';
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

  constructor(private http:HttpClient, private router:Router) { }

  getMaestros(): Observable<Maestro[]>{
    return this.http.get(this.get_urlEndpoint).pipe(
      map(response => response as Maestro[])
    );
  }

  getMaestro(id:number): Observable<Maestro>{
    return this.http.get<Maestro>(`${this.get_urlEndpoint}/${id}`).pipe(
      catchError(e =>{
        this.router.navigate(['/maestros']);
        Swal.fire('Error',e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  create(maestro:Maestro):Observable<Maestro>{
    return this.http.post<Maestro>(this.post_urlEndpoint, maestro, {headers: this.httpHeaders}).pipe(
      catchError(e=>{
        Swal.fire('Error',e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }
  
  update(maestro:Maestro):Observable<Maestro>{
    return this.http.put<Maestro>(`${this.put_urlEndpoint}/${maestro.numeroEmpleado}`,maestro,{headers:this.httpHeaders}).pipe(
      catchError(e=>{
        Swal.fire('Error',e.error.mensaje,'error');
        return throwError(e);
      })
    );
  }

  delete(numeroEmpleado:number):Observable<Maestro>{
    return this.http.delete<Maestro>(`${this.delete_urlEndpoint}/${numeroEmpleado}`,{headers:this.httpHeaders}).pipe(
      catchError(e=>{
        Swal.fire('Error', e.error.mensaje);
        return throwError(e);
      })
    );
  }

  getEstatus():Observable<EstatusUsuario[]>{
    return this.http.get<EstatusUsuario[]>(this.estatus_urlEndpoint,{headers:this.httpHeaders});
  }

  getTipo():Observable<TipoMaestro[]>{
    return this.http.get<TipoMaestro[]>(this.tipo_urlEndpoint,{headers:this.httpHeaders});
  }
}
