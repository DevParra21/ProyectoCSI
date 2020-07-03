import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Alumno, AlumnoRegistro } from './alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private get_urlEndpoint: string='http://localhost:8080/api/alumnos';
  private post_urlEndpoint: string='http://localhost:8080/api/registra-alumno';
  private put_urlEndpoint: string='http://localhost:8080/api/modifica-alumno';
  private delete_urlEndpoint: string='http://localhost:8080/api/elimina-alumno';

  private httpHeaders:HttpHeaders= new HttpHeaders({
    'Content-type':'application/json'
  });
  constructor(private http: HttpClient) { }

  getAlumnos(): Observable<Alumno[]>{
    return this.http.get(this.get_urlEndpoint).pipe(
      map( response => response as Alumno[])
    );
  }

  getAlumno(id:number): Observable<Alumno>{
    return this.http.get(`${this.get_urlEndpoint}/${id}`).pipe(
      map(response => response as Alumno)
    );
  }

  create(alumno:Alumno):Observable<Alumno>{
    return this.http.post<Alumno>(this.post_urlEndpoint, alumno, {headers: this.httpHeaders});
  }

  update(alumno:Alumno):Observable<Alumno>{
    return this.http.put<Alumno>(`${this.put_urlEndpoint}/${alumno.matricula}`, alumno, {headers:this.httpHeaders});
  }

  delete(matricula:number):Observable<Alumno>{
    return this.http.delete<Alumno>(`${this.delete_urlEndpoint}/${matricula}`,{headers: this.httpHeaders});
  }
}
