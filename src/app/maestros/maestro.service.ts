import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Maestro } from './maestro';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MaestroService {

  private urlEndpoint:string = 'http://localhost:8080/api/maestros';

  constructor(private http:HttpClient) { }

  getMaestros(): Observable<Maestro[]>{
    return this.http.get(this.urlEndpoint).pipe(
      map(response => response as Maestro[])
    );
  }
}
