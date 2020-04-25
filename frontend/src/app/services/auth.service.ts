import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:3000/api';

  constructor( private http : HttpClient,
    private router: Router) { }

  createUser(user) {
    return this.http.post<any>(this.url + "/usuarios", user);
  }

  loginUser(user){
    return this.http.post<any>(this.url + "/usuarios/login", user);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/register']);
  }
}
