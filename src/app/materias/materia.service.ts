import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Materia } from './materia';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EstatusMateria } from '../catalogos/catalogos';
import { InicioService } from '../inicio/inicio.service';
@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  

  private get_urlEndpoint:string = 'http://localhost:8080/api/materias';
  private post_urlEndpoint:string = 'http://localhost:8080/api/registra-materia';
  private put_urlEndpoint:string = 'http://localhost:8080/api/modifica-materia';
  private delete_urlEndpoint:string = 'http://localhost:8080/api/elimina-materia';
  private estatusMateria_urlEndpoint:string ='http://localhost:8080/api/estatus-materia';
  private httpHeaders:HttpHeaders = new HttpHeaders({
    'Content-type' : 'application/json'
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

  getMaterias(): Observable<Materia[]>{
    return this.http.get<Materia[]>(this.get_urlEndpoint, {headers:this.addAuthHeaders()}).pipe(
      catchError(e=>{
        this.router.navigate(['/principal']);
        Swal.fire('Error', e.error.error,'error');
        return throwError(e);
      })
    );
  }

  getMateria(id:number): Observable<Materia>{
    return this.http.get<Materia>(`${this.get_urlEndpoint}/${id}`,{headers:this.addAuthHeaders()}).pipe(
      catchError(e=>{
        this.router.navigate(['/principal']);
        Swal.fire('Error', e.error.error,'error');
        return throwError(e);
      })
    );
  }

  create(materia:Materia){
    return this.http.post<Materia>(this.post_urlEndpoint, materia, {headers:this.addAuthHeaders()}).pipe(
      catchError(e=>{
        let errorString = '';
        if(e.error.error.includes('Duplicate'))
          errorString = 'Ya existe una materia con esa clave';
        Swal.fire('Error',e.error.error + ': ' + errorString,'error');
        return throwError(e);
      })
    )
  }

  update(materia:Materia){
    return this.http.put<Materia>(`${this.put_urlEndpoint}/${materia.id}`,materia,{headers:this.addAuthHeaders()}).pipe(
      catchError(e=>{
        Swal.fire('Error',e.error.error,'error');
        return throwError(e);
      })
    );
  }

  delete(id:number):Observable<Materia>{
    console.log("eliminando materia...");
    console.log("id: " + id);
    return this.http.delete<Materia>(`${this.delete_urlEndpoint}/${id}`,{headers:this.addAuthHeaders()}).pipe(
      catchError(e=>{
        Swal.fire('Error', e.error.error,'error');
        return throwError(e);
      })
    );
  }

  getEstatusMateria():Observable<EstatusMateria[]>{
    return this.http.get<EstatusMateria[]>(this.estatusMateria_urlEndpoint,{headers:this.httpHeaders});
  }
}
