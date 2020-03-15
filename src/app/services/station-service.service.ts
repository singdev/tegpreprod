import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StationService } from '../logic/station-service';
import { AuthService } from './auth.service';
import { URL } from '../common/remote';

@Injectable({
  providedIn: 'root'
})
export class StationServiceService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllStationServices(): Observable<Array<StationService>>{
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`,
       'content-type': 'application/json'});

    console.log("Get all station service");
    console.log(`${URL}/station-service`);
    return this.http.get<Array<StationService>>(`${URL}/station-service`, { headers: headers });
  }

  getStationService(id: number): Observable<StationService>{
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`,
       'content-type': 'application/json'});

    return this.http.get<StationService>(`${URL}/station-service/${id}`, { headers: headers});
  }

  getWorkerStationService(userId: number): Observable<any>{
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`,
       'content-type': 'application/json'});

    return this.http.get<any>(`${URL}/station-service-worker/search/by-user/${userId}`, { headers: headers});
  }

  addStationService(stationService: StationService): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`,
       'content-type': 'application/json'});

    return this.http.post(`${URL}/station-service`, stationService, {
      headers: headers
    });
  }

  updateStationServiceData(stationService: StationService): Observable<any> {
    const stationServiceCopy = { 
        name: stationService.name,
        email: stationService.email,
        gerant: stationService.gerant,
        phone: stationService.phone,
        sap: stationService.sap,
        ville: stationService.ville
    };
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`,
       'content-type': 'application/json'});

    return this.http.put(`${URL}/station-service/${stationService.id}`, stationServiceCopy, {
      headers: headers
    });
  }
}
