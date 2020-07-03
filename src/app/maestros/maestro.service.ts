import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Maestro } from './maestro';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MaestroService {

  private get_urlEndpoint:string = 'http://localhost:8080/api/maestros';
  private post_urlEndpoint:string = 'http://localhost:8080/api/registra-maestro';
  private put_urlEndpoint:string = 'http://localhost:8080/api/modifica-maestro';
  private delete_urlEndpoint:string = 'http://localhost:8080/api/elimina-maestro';
  private httpHeaders:HttpHeaders= new HttpHeaders({
    'Content-type':'application/json'
  });

  constructor(private http:HttpClient) { }

  getMaestros(): Observable<Maestro[]>{
    return this.http.get(this.get_urlEndpoint).pipe(
      map(response => response as Maestro[])
    );
  }

  getMaestro(id:number): Observable<Maestro>{
    return this.http.get(`${this.get_urlEndpoint}/${id}`).pipe(
      map(response => response as Maestro)
    );
  }

  create(maestro:Maestro):Observable<Maestro>{
    return this.http.post<Maestro>(this.post_urlEndpoint, maestro, {headers: this.httpHeaders});
  }
  
  update(maestro:Maestro):Observable<Maestro>{
    return this.http.put(`${this.put_urlEndpoint}/${maestro.numeroEmpleado}`,maestro,{headers:this.httpHeaders}).pipe(
      map(response => response as Maestro)
    );
  }

  delete(numeroEmpleado:number):Observable<Maestro>{
    return this.http.delete<Maestro>(`${this.delete_urlEndpoint}/${numeroEmpleado}`,{headers:this.httpHeaders});
  }
}
