import { Injectable } from '@angular/core';
import { Actu } from '../logic/actu';
import { Observable, from } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { URL } from '../common/remote';

@Injectable({
  providedIn: 'root'
})
export class ActuService {

  constructor(private http: HttpClient,
    private authService: AuthService) { }

 getAllActu(): Observable<any>{
   let headers: HttpHeaders = new HttpHeaders(
     {'authorization': `Bearer ${this.authService.getToken()}`});

   return this.http.get(`${URL}/actu`, { headers: headers });
 }

 changeActu(file: File, actu: Actu): Observable<any> {
   const formData: FormData = new FormData();
   formData.append('illustration', file);

   let headers: HttpHeaders = new HttpHeaders(
     {'authorization': `Bearer ${this.authService.getToken()}`});

   return this.http.put(`${URL}/actu/${actu.id}`, formData, { headers: headers})
 }

 createActu(file: File, actu: Actu): Observable<any> {
   const formData: FormData = new FormData();
   formData.append('illustration', file);
   formData.append('title', actu.title);
   formData.append('content', actu.content);
   formData.append('author', this.authService.getAuthenticatedUser().id);
   formData.append('publish', new Date().toISOString());

   let headers: HttpHeaders = new HttpHeaders(
     {'authorization': `Bearer ${this.authService.getToken()}`});

   return this.http.post(`${URL}/actu`, formData, { headers: headers})
 }
}
