import { Component, OnInit, Input } from '@angular/core';
import { StationService } from '../logic/station-service';
import { ObjectifsService } from '../services/objectifs.service';
import { RealisationVolume } from '../logic/realisation-volume';
import { RealisationTopService } from '../logic/realisation-top-service';
import { ObjectifTopService } from '../logic/objectif-top-service';
import { ObjectifVolume } from '../logic/objectif-volume';
import { RealisationVolumeService } from '../services/realisation-volume.service';
import { RealisationTopServiceService } from '../services/realisation-top-service.service';

@Component({
  selector: 'app-gerant-accueil',
  templateUrl: './gerant-accueil.component.html',
  styleUrls: ['./gerant-accueil.component.css']
})
export class GerantAccueilComponent implements OnInit {

  @Input() stationService: StationService;
  currentYear: number;
  currentMonth: number;

  realisationVolume: Array<RealisationVolume>;
  realisationTopService: RealisationTopService;
  objectifTopService: ObjectifTopService;
  objectifVolume: ObjectifVolume;

  constructor(private objectifService: ObjectifsService,
    private rvService: RealisationVolumeService,
    private rtsService: RealisationTopServiceService) { }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    this.currentMonth = new Date().getMonth();
    this.loadObjectifVolume();
    this.loadRealisationTopService();
    this.loadRealisationVolume();
    this.loadObjectifTopService();

  }

  loadObjectifVolume(){
    this.objectifService.getObjectifVolumeByYear(this.currentYear).subscribe(
      res => {
        this.objectifVolume = res[0];
      }
    )
  }

  moyen(): number{
    return (this.realisationTopService.n_s1 + this.realisationTopService.n_s2)/2;
  }

  loadRealisationTopService(){
    this.rtsService.getRealisationTopServiceByYear(this.currentYear, this.stationService.id).subscribe(
      res => {
        this.realisationTopService = res[0]
      }
    )
  }

  loadObjectifTopService(){
    this.objectifService.getObjectifTopServiceByYear(this.currentYear).subscribe(
      res => {
        this.objectifTopService = res[0];
        console.log(ObjectifTopService);
      }
    )
  }

  loadRealisationVolume(){
    this.rvService.getRealisationVolumeByYear(this.currentYear)
    .subscribe(
      res => {
        this.realisationVolume = [];
        res.forEach(r => {
          const month: any = r.month;
          if(r.ss == this.stationService.id && month <= this.currentMonth+1 ){
            this.realisationVolume.push(r);
          }
        });
        this.realisationVolume.sort((a, b) => {
          const month1:any = a.month;
          const month2:any = b.month;
          return month1-month2;
        });
      },
      err => {

      }
    )
  }

}
