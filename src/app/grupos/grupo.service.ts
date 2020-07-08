import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Grupo } from './grupo';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Materia } from '../materias/materia';
import { InicioService } from '../inicio/inicio.service';
@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  
  private get_urlEndpoint = "http://localhost:8080/api/grupos";
  private post_urlEndpoint = "http://localhost:8080/api/registra-grupo";
  private put_urlEndpoint = "http://localhost:8080/api/modifica-grupo";
  private get_materiasUrl = "http://localhost:8080/api/grupos/materias";
  private delete_urlEndpoint = "http://localhost:8080/api/elimina-grupo";

  
  private httpHeaders:HttpHeaders = new HttpHeaders({
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

  getGrupos():Observable<Grupo[]>{
    return this.http.get<Grupo[]>(this.get_urlEndpoint,{headers:this.addAuthHeaders()});
  }

  getMaterias():Observable<Materia[]>{
    return this.http.get<Materia[]>(this.get_materiasUrl,{headers:this.addAuthHeaders()});
  }

  getGrupo(id:number):Observable<Grupo>{
    return this.http.get<Grupo>(`${this.get_urlEndpoint}/${id}`,{headers:this.addAuthHeaders()}).pipe(
      catchError(e=>{
        this.router.navigate(['/grupos']);
        Swal.fire('Error', e.error.error,'error');
        return throwError(e);
      })
    );
  }

  create(grupo:Grupo){
    return this.http.post<Grupo>(this.post_urlEndpoint,grupo,{headers:this.addAuthHeaders()});
  }

  update(grupo:Grupo){
    return this.http.put<Grupo>(`${this.put_urlEndpoint}/${grupo.id}`, grupo, {headers:this.addAuthHeaders()})
  }

  delete(id:number):Observable<Grupo>{
    console.log("eliminando grupo...");
    console.log("id: " + id);
    return this.http.delete<Grupo>(`${this.delete_urlEndpoint}/${id}`,{headers:this.addAuthHeaders()}).pipe(
      catchError(e=>{
        Swal.fire('Error', e.error.error,'error');
        return throwError(e);
      })
    );
  }
}
