import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import {Router} from "@angular/router";

@Injectable()
export class AuthService {
  private _registerUrl = "http://localhost:3000/api/register"
  private _loginUrl = 'http://localhost:3000/api/login'

  constructor(private http: HttpClient, private router : Router) { }

  registerUser(user){
    return this.http.post<any>(this._registerUrl,user)
  }

  loginUser(user){
    return this.http.post<any>(this._loginUrl,user)
  }

  isLoggedIn(){
    return !!localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
  }

  getLoggedInUser(){
    return localStorage.getItem('userData')
  }

  logoutUser(){
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    this.router.navigate(['/events'])
  }

}
