import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { URL } from '../common/remote';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public isAuthenticated(): boolean {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('teg-token');
    // Check whether the token is expired and return
    // true or false
    return !jwtHelper.isTokenExpired(token);
  }

  public authenticate(username: string, password: string) {
      return this.http.get(`${URL}/auth/${username}/${password}`)
  }

  public persistToken(token: string){
    localStorage.setItem('teg-token', token);
  }

  public getToken(): string {
    return localStorage.getItem('teg-token');
  }

  public getAuthenticatedUser(){
    const jwtHelper = new JwtHelperService();

    return jwtHelper.decodeToken(this.getToken()).user;
  }
}
