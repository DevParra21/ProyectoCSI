import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Alumno } from './alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private urlEndpoint: string='http://localhost:8080/api/alumnos';

  constructor(private http: HttpClient) { }

  getAlumnos(): Observable<Alumno[]>{
    return this.http.get(this.urlEndpoint).pipe(
      map( response => response as Alumno[])
    );
  }
}
