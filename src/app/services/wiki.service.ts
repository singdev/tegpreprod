import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Wiki } from '../logic/wiki';
import { AuthService } from './auth.service';
import { URL} from '../common/remote';

@Injectable({
  providedIn: 'root'
})
export class WikiService {

  constructor(private http: HttpClient,
     private authService: AuthService) { }

  getAllWiki(): Observable<any>{
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`});

    return this.http.get(`${URL}/wiki-station`, { headers: headers });
  }

  changeWiki(file: File, wiki: Wiki): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('document', file);

    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`});

    return this.http.put(`${URL}/wiki-station/${wiki.id}`, formData, { headers: headers})
  }

  createWiki(file: File, wiki: Wiki): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('document', file);
    formData.append('categorie', wiki.categorie);
    formData.append('mime_type', file.type);
    formData.append('size', file.size + '');
    formData.append('author', this.authService.getAuthenticatedUser().id);
    formData.append('publish', new Date().toISOString());

    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`});

    return this.http.post(`${URL}/wiki-station`, formData, { headers: headers})
  }
}
