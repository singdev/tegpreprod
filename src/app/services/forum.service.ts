import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ForumPost } from '../logic/forum-post';
import { ForumSubject } from '../logic/forum-subject';
import { URL } from 'src/app/common/remote';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private authService: AuthService,
    private http: HttpClient) { }

  getAllSubject(): Observable<any>{
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`});
 
    return this.http.get(`${URL}/forum-subject`, { headers: headers });
  }

  addSubject(subject: ForumSubject): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`,
       'content-type': 'application/json'});
    return this.http.post(`${URL}/forum-subject`, subject, {
      headers: headers
    });
  }

  addPost(post: ForumPost): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`,
       'content-type': 'application/json'});
    return this.http.post(`${URL}/forum-post`, post, {
      headers: headers
    });
  }

  getPostBySubject(subject: number): Observable<Array<ForumPost>>{
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`,
       'content-type': 'application/json'});

    return this.http.get<Array<ForumPost>>(`${URL}/forum-post/search/by-subject/${subject}`, { headers: headers });
  }

  getPostByUser(user: number): Observable<Array<ForumPost>>{
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`,
       'content-type': 'application/json'});

    return this.http.get<Array<ForumPost>>(`${URL}/forum-post/search/by-author/${user}`, { headers: headers });
  }


}
