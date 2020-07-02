import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Grupo } from './grupo';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  
  private urlEndpoint = "http://localhost:8080/api/grupos";
  constructor(private http:HttpClient) { }

  getGrupos():Observable<Grupo[]>{
    return this.http.get(this.urlEndpoint).pipe(
      map(response => response as Grupo[])
    );
  }
}
