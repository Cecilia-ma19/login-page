import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.types';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl: string = "https://patas-backend.onrender.com/auth"

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string){
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/login", {email, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("userName", value.name)
      })
    )
  }

  signup(name:string, email: string, password: string){
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/register", {name, email, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("userName", value.name)
      })
    )
  }
}
