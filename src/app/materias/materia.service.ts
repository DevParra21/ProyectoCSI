import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Materia } from './materia';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  

  private get_urlEndpoint:string = 'http://localhost:8080/api/materias';
  private post_urlEndpoint:string = 'http://localhost:8080/api/registra-materia';
  private put_urlEndpoint:string = 'http://localhost:8080/api/modifica-materia';
  private httpHeaders:HttpHeaders = new HttpHeaders({
    'Content-type' : 'application/json'
  });
  constructor(private http:HttpClient) { }

  getMaterias(): Observable<Materia[]>{
    return this.http.get(this.get_urlEndpoint).pipe(
      map(response => response as Materia[])
    );
  }

  getMateria(id:number): Observable<Materia>{
    return this.http.get(`${this.get_urlEndpoint}/${id}`).pipe(
      map(response => response as Materia)
    );
  }

  create(materia:Materia){
    return this.http.post<Materia>(this.post_urlEndpoint, materia, {headers:this.httpHeaders});
  }

  update(materia:Materia){
    return this.http.put(`${this.put_urlEndpoint}/${materia.id}`,materia,{headers:this.httpHeaders}).pipe(
      map(response => response as Materia)
    );
  }
}
