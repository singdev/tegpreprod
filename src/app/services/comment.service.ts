import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { URL } from 'src/app/common/remote';
import { Comment} from 'src/app/logic/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  addComment(comment: Comment): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`,
       'content-type': 'application/json'});
    return this.http.post(`${URL}/comment`, comment, {
      headers: headers
    });
  }

  getCommentByYear(article: number): Observable<Array<Comment>>{
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`,
       'content-type': 'application/json'});

    return this.http.get<Array<Comment>>(`${URL}/comment/search/by-article/${article}`, { headers: headers });
  }
}
