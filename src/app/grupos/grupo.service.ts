import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Grupo } from './grupo';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  
  private get_urlEndpoint = "http://localhost:8080/api/grupos";
  private post_urlEndpoint = "http://localhost:8080/api/registra-grupo";
  private put_urlEndpoint = "http://localhost:8080/api/modifica-grupo";
  
  private httpHeaders:HttpHeaders = new HttpHeaders({
    'Content-type':'application/json'
  });
  constructor(private http:HttpClient, private router:Router) { }

  getGrupos():Observable<Grupo[]>{
    return this.http.get(this.get_urlEndpoint).pipe(
      map(response => response as Grupo[])
    );
  }

  getGrupo(id:number):Observable<Grupo>{
    return this.http.get<Grupo>(`${this.get_urlEndpoint}/${id}`).pipe(
      catchError(e=>{
        this.router.navigate(['/grupos']);
        Swal.fire('Error', e.error.mensaje,'error');
        return throwError(e);
      })
    );
  }

  create(grupo:Grupo){
    return this.http.post<Grupo>(this.post_urlEndpoint,grupo,{headers:this.httpHeaders});
  }

  update(grupo:Grupo){
    return this.http.put<Grupo>(`${this.put_urlEndpoint}/${grupo.id}`, grupo, {headers:this.httpHeaders})
  }
}
