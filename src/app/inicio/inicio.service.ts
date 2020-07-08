import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from './inicio';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class InicioService {
  
  private _usuario:Usuario;
  private _token:string;
  constructor(private http:HttpClient) { }

  public get usuario():Usuario{
    if(this._usuario!=null){
      return this._usuario;
    }
    else if(this._usuario == null && sessionStorage.getItem('usuario')!=null){
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }
  public get token():string{
    if(this._token!=null){
      return this._token;
    }
    else if(this._token == null && sessionStorage.getItem('token')!=null){
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }


  login(usuario:Usuario):Observable<any>{
    const url_enpoint='http://localhost:8080/oauth/token';
    const credenciales= btoa('angularapp'+':'+'app123');
    const httpHeaders = new HttpHeaders({
      'Content-type':'application/x-www-form-urlencoded',
      'Authorization':'Basic ' + credenciales
    });
    let params = new URLSearchParams();
    params.set('grant_type','password');
    params.set('username',usuario.nombreUsuario);
    params.set('password',usuario.contrasenia);


    return this.http.post(url_enpoint,params.toString(),{headers:httpHeaders});
  }

  guardarUsuario(accesstoken:string){
    let payload = this.obtenerDatosToken(accesstoken);
    this._usuario = new Usuario();
    this._usuario.nombreUsuario=payload.user_name;
    this._usuario.rol = payload.rol_usuario;
    if(this._usuario.rol === "ROLE_ALUMNI"){
      this._usuario.matricula = payload.matricula;
    }
    else if(this._usuario.rol === "ROLE_PROFFESOR"){
      this._usuario.noEmpleado = payload.numero_empleado;
    }
    console.log('Usuario guardado:' + JSON.stringify(this._usuario));
    sessionStorage.setItem('usuario',JSON.stringify(this._usuario));
  }
  
  guardarToken(accesstoken:string){
    this._token = accesstoken;
    sessionStorage.setItem('token',accesstoken);
  }

  obtenerDatosToken(accesstoken:string):any{
    if(accesstoken!=null){
      return JSON.parse(atob(accesstoken.split('.')[1]));
    }
    return null;
  }

  isAuthenticated():boolean{
    let payload = this.obtenerDatosToken(this.token);
    if(payload != null && payload.user_name != null && payload.user_name.length>0){
      return true;
    }
    return false;
  }

  logout():void{
    this._token=null;
    this._usuario=null;
    sessionStorage.clear();
  }
}
