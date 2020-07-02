import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Materia } from './materia';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  

  private urlEndpoint:string = 'http://localhost:8080/api/materias';

  constructor(private http:HttpClient) { }

  getMaterias(): Observable<Materia[]>{
    return this.http.get(this.urlEndpoint).pipe(
      map(response => response as Materia[])
    );
  }
}
