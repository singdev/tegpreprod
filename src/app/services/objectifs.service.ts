import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { ObjectifVolume } from '../logic/objectif-volume';
import { ObjectifTopService } from '../logic/objectif-top-service';
import { URL } from '../common/remote';

@Injectable({
  providedIn: 'root'
})
export class ObjectifsService {

  constructor(private http: HttpClient, private authService: AuthService) { }

 
  getAllObjectifVolumes(): Observable<Array<ObjectifVolume>>{
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`,
       'content-type': 'application/json'});

    return this.http.get<Array<ObjectifVolume>>(`${URL}/objectif-volume`, { headers: headers });
  }

  getObjectifVolumeByYear(year: number): Observable<Array<ObjectifVolume>>{
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`,
       'content-type': 'application/json'});

    return this.http.get<Array<ObjectifVolume>>(`${URL}/objectif-volume/search/by-year/${year}`, { headers: headers });
  }

  getObjectifTopServiceByYear(year: number): Observable<Array<ObjectifTopService>>{
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`,
       'content-type': 'application/json'});

    return this.http.get<Array<ObjectifTopService>>(`${URL}/objectif-top-service/search/by-year/${year}`, { headers: headers });
  }


  getObjectifVolume(id: number): Observable<ObjectifVolume>{
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`,
       'content-type': 'application/json'});

    return this.http.get<ObjectifVolume>(`${URL}/objectif-volume/${id}`, { headers: headers});
  }

  addObjectifVolume(objectifVolume: ObjectifVolume): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`,
       'content-type': 'application/json'});
    return this.http.post(`${URL}/objectif-volume`, objectifVolume, {
      headers: headers
    });
  }

  addObjectifTopService(objectifTopService: ObjectifTopService): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`,
       'content-type': 'application/json'});
    return this.http.post(`${URL}/objectif-top-service`, objectifTopService, {
      headers: headers
    });
  }

  updateObjectifVolumeData(objectifVolume: ObjectifVolume): Observable<any> {
    const objectifVolumeCopy = { 
      year: objectifVolume.year, 
      lubrifiant: objectifVolume.lubrifiant, 
      carburant: objectifVolume.carburant,
      sfs: objectifVolume.sfs,
      gpl: objectifVolume.gpl,
      croissanterie: objectifVolume.croissanterie,
      wash: objectifVolume.wash
    };
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`,
       'content-type': 'application/json'});

    return this.http.put(`${URL}/objectif-volume/${objectifVolume.id}`, objectifVolumeCopy, {
      headers: headers
    });
  }

  updateObjectifTopServiceData(objectifTopService: ObjectifTopService): Observable<any> {
    const objectifTopServiceCopy = { 
      year: objectifTopService.year,
      indicateur_filial: objectifTopService.indicateur_filial
    };
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`,
       'content-type': 'application/json'});

    return this.http.put(`${URL}/objectif-top-service/${objectifTopService.id}`, objectifTopServiceCopy, {
      headers: headers
    });
  }
}
