import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Materia } from './materia';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EstatusMateria } from '../catalogos/catalogos';
@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  

  private get_urlEndpoint:string = 'http://localhost:8080/api/materias';
  private post_urlEndpoint:string = 'http://localhost:8080/api/registra-materia';
  private put_urlEndpoint:string = 'http://localhost:8080/api/modifica-materia';
  private estatusMateria_urlEndpoint:string ='http://localhost:8080/api/estatus-materia';
  private httpHeaders:HttpHeaders = new HttpHeaders({
    'Content-type' : 'application/json'
  });
  constructor(private http:HttpClient, private router:Router) { }

  getMaterias(): Observable<Materia[]>{
    return this.http.get(this.get_urlEndpoint).pipe(
      map(response => response as Materia[])
    );
  }

  getMateria(id:number): Observable<Materia>{
    return this.http.get<Materia>(`${this.get_urlEndpoint}/${id}`).pipe(
      catchError(e=>{
        this.router.navigate(['/materias']);
        Swal.fire('Error', e.error.mensaje,'error');
        return throwError(e);
      })
    );
  }

  create(materia:Materia){
    return this.http.post<Materia>(this.post_urlEndpoint, materia, {headers:this.httpHeaders}).pipe(
      catchError(e=>{
        let errorString = '';
        if(e.error.error.includes('Duplicate'))
          errorString = 'Ya existe una materia con esa clave';
        Swal.fire('Error',e.error.mensaje + ': ' + errorString,'error');
        return throwError(e);
      })
    )
  }

  update(materia:Materia){
    return this.http.put<Materia>(`${this.put_urlEndpoint}/${materia.id}`,materia,{headers:this.httpHeaders}).pipe(
      catchError(e=>{
        Swal.fire('Error',e.error.mensaje,'error');
        return throwError(e);
      })
    );
  }

  getEstatusMateria():Observable<EstatusMateria[]>{
    return this.http.get<EstatusMateria[]>(this.estatusMateria_urlEndpoint,{headers:this.httpHeaders});
  }
}
