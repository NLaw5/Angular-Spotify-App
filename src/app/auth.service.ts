import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from './../environments/environment';

import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

import {User} from './User';
import {RegisterUser} from './RegisterUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userAPI = environment.userAPIBase;
  constructor( private http: HttpClient) { }

  public getToken(): string | any {
    return localStorage.getItem('access_token');
  }

  public readToken(): User | any {
    let token: string | any
    token = localStorage.getItem('access_token');
    return helper.decodeToken(token)
  }

  isAuthenticated(): boolean {
    let token: string | any
    token = localStorage.getItem('access_token')

    if(token) {
      console.log('token exists')
      return true;
    }
    else
    {
      console.log('no token')
      return false
    }
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(this.userAPI+"/login", user)
  }

  logout() {
    localStorage.removeItem('access_token')
    console.log("User has Logged out")
  }

  register(registerUser: RegisterUser): Observable<any> {
    return this.http.post<any>(this.userAPI+"/register", registerUser)
  }
}