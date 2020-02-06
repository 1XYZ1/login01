import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.models';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private url = 'https://identitytoolkit.googleapis.com/v1/accounts:'
private apiKey = 'AIzaSyCFTq19gviKVaXU5EoMwBMMfDTvmzXKHpQ'

userToken: string;

  // Crear usuarios
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[this.apiKey]


  // Iniciar sesion
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]


  constructor( private http: HttpClient) {
    this.leerToken();
   }

  logout(){
  localStorage.removeItem('token');
  }


  login(usuario: UsuarioModel){

    const authData  = {

      // email : usuario.email,
      // pssword: usuario.password,
      ...usuario,
      returnSecureToken: true

    };
    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apiKey}`, 
      authData
    ).pipe(
      map(resp => {
        console.log('Entró en el map')
        this.guardarToken(resp['idToken']);
        return resp
      })
    )

  }

  nuevoUsuario(usuario: UsuarioModel){


    const authData  = {

      // email : usuario.email,
      // pssword: usuario.password,
      ...usuario,
      returnSecureToken: true

    };

    return this.http.post(
      `${this.url}signUp?key=${this.apiKey}`, 
      authData
    ).pipe(
      map(resp => {
        console.log('Entró en el map')
        this.guardarToken(resp['idToken']);
        return resp
      })
    )
  }


  private guardarToken(idToken: string){

    this.userToken = idToken;
    localStorage.setItem('token', idToken)
  }

  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  autenticado(): boolean {
    return this.userToken.length > 2;
  }
}
