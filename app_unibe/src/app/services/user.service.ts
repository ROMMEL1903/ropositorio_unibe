import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs';


interface credenciales {
  correo: string,
  clave:string
}
@Injectable({
  providedIn: 'root'
})
export class UserService {


  private myAppUrl: string
  private myApi: string

  

  constructor(private http:HttpClient) { 
    this.myAppUrl='http://localhost:3001/';
    this.myApi='usuarios/'
  }

  singIn(usuario:Usuario): Observable <any>{
    return this.http.post(this.myAppUrl+this.myApi, usuario)

  }

  login(credenciales:credenciales):Observable <string>{
    return this.http.post<string>(this.myAppUrl+this.myApi+'login', credenciales)
  }
}
