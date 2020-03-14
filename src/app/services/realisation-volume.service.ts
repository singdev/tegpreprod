import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL } from '../common/remote';
import { RealisationVolume } from '../logic/realisation-volume';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RealisationVolumeService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllRealisationVolumes(): Observable<Array<RealisationVolume>>{
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`,
       'content-type': 'application/json'});

    return this.http.get<Array<RealisationVolume>>(`${URL}/realisation-volume`, { headers: headers });
  }

  getRealisationVolumeByYear(year: number): Observable<Array<RealisationVolume>>{
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`,
       'content-type': 'application/json'});

    return this.http.get<Array<RealisationVolume>>(`${URL}/realisation-volume/search/by-year/${year}`, { headers: headers });
  }

  getRealisationVolume(id: number): Observable<RealisationVolume>{
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`,
       'content-type': 'application/json'});

    return this.http.get<RealisationVolume>(`${URL}/realisation-volume/${id}`, { headers: headers});
  }

  addRealisationVolume(realisationVolume: RealisationVolume): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`,
       'content-type': 'application/json'});
    return this.http.post(`${URL}/realisation-volume`, realisationVolume, {
      headers: headers
    });
  }

  updateRealisationVolumeData(realisationVolume: RealisationVolume): Observable<any> {
    const realisationVolumeCopy = { 
      ss: realisationVolume.ss,
      year: realisationVolume.year, 
      lubrifiant: realisationVolume.lubrifiant, 
      carburant: realisationVolume.carburant,
      sfs: realisationVolume.sfs,
      gpl: realisationVolume.gpl,
      croissanterie: realisationVolume.croissanterie,
      wash: realisationVolume.wash
    };
    let headers: HttpHeaders = new HttpHeaders(
      {'authorization': `Bearer ${this.authService.getToken()}`,
       'content-type': 'application/json'});

    return this.http.put(`${URL}/realisation-volume/${realisationVolume.id}`, realisationVolumeCopy, {
      headers: headers
    });
  }
}
