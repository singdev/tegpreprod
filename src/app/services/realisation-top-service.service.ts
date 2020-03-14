import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { RealisationTopService } from '../logic/realisation-top-service';
import { URL} from '../common/remote';

@Injectable({
  providedIn: 'root'
})
export class RealisationTopServiceService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllRealisationTopServices(): Observable<Array<RealisationTopService>>{
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`,
       'content-type': 'application/json'});

    return this.http.get<Array<RealisationTopService>>(`${URL}/realisation-top-service`, { headers: headers });
  }

  getRealisationTopServiceByYear(year: number, ss: number): Observable<Array<RealisationTopService>>{
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`,
       'content-type': 'application/json'});

    return this.http.get<Array<RealisationTopService>>(`${URL}/realisation-top-service/search/by-year/${year}/${ss}`, { headers: headers });
  }

  getRealisationTopService(id: number): Observable<RealisationTopService>{
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`,
       'content-type': 'application/json'});

    return this.http.get<RealisationTopService>(`${URL}/realisation-top-service/${id}`, { headers: headers});
  }

  addRealisationTopService(realisationTopService: RealisationTopService): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`,
       'content-type': 'application/json'});
    return this.http.post(`${URL}/realisation-top-service`, realisationTopService, {
      headers: headers
    });
  }

  updateRealisationTopServiceData(realisationTopService: RealisationTopService): Observable<any> {
    const realisationTopServiceCopy = { 
      n_s1: realisationTopService.n_s1,
      n_s2: realisationTopService.n_s2
    };
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`,
       'content-type': 'application/json'});

    return this.http.put(`${URL}/realisation-top-service/${realisationTopService.id}`, realisationTopServiceCopy, {
      headers: headers
    });
  }
}
