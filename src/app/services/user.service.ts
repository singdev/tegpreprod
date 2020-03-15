import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { URL } from '../common/remote';
import { Observable } from 'rxjs';
import { User } from '../logic/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  changeUserPassword(newPassword: string, userId: number): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`,
       'content-type': 'application/json'});

    return this.http.put(`${URL}/users/${userId}`, { password: newPassword }, {
      headers: headers
    });
  }

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllUsers(): Observable<Array<User>>{
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`,
       'content-type': 'application/json'});

    return this.http.get<Array<User>>(`${URL}/users`, { headers: headers });
  }

  getAllGerants(): Observable<Array<User>>{
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`,
       'content-type': 'application/json'});

    return this.http.get<Array<User>>(`${URL}/users/search/by-role/GERANT`, { headers: headers });
  }

  getUser(id: number): Observable<User>{
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`,
       'content-type': 'application/json'});

    return this.http.get<User>(`${URL}/users/${id}`, { headers: headers});
  }

  addUser(user: User): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`,
       'content-type': 'application/json'});

    return this.http.post(`${URL}/users`, user, {
      headers: headers
    });
  }

  updateUserData(user: User): Observable<any> {
    const userCopy = { 
      fullname: user.fullname,
      username: user.username, 
      email: user.email, 
      phone: user.phone,
      role: user.role };
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`,
       'content-type': 'application/json'});

    return this.http.put(`${URL}/users/${user.id}`, userCopy, {
      headers: headers
    });
  }
}
