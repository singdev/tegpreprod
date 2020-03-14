import { Component, OnInit } from '@angular/core';
import { ObjectifVolume } from '../logic/objectif-volume';
import { ObjectifTopService } from '../logic/objectif-top-service';
import { ObjectifsService } from '../services/objectifs.service';

@Component({
  selector: 'app-objectif-management',
  templateUrl: './objectif-management.component.html',
  styleUrls: ['./objectif-management.component.css']
})
export class ObjectifManagementComponent implements OnInit {

  objectifVolume: ObjectifVolume;
  objectifTopService: ObjectifTopService;

  currentYear: number;

  constructor(private objectService: ObjectifsService) { }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    this.downloadObjectifTopServiceForCurrentYear();
    this.downloadObjectifVolumeForCurrentYear();
  }


  downloadObjectifVolumeForCurrentYear(){
      this.objectService.getObjectifVolumeByYear(this.currentYear).subscribe(
        res => {
          console.log(res);
          if(res.length == 0){
            this.addObjectifVolumeForCurrentYear();
            this.downloadObjectifVolumeForCurrentYear();
          } else {
            this.objectifVolume = res[0];
          }
        },
        err => {

        }
      );
  }

  downloadObjectifTopServiceForCurrentYear(){
    this.objectService.getObjectifTopServiceByYear(this.currentYear).subscribe(
      res => {
        console.log(res);
        if(res.length == 0){
          this.addObjectifTopServiceForCurrentYear();
          this.downloadObjectifTopServiceForCurrentYear();
        } else {
          this.objectifTopService = res[0];
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  addObjectifVolumeForCurrentYear(){
    this.objectService.addObjectifVolume({ 
      id: undefined,
      year: this.currentYear,
      lubrifiant: 0,
      carburant: 0,
      sfs: 0,
      gpl: 0,
      croissanterie: 0,
      wash: 0}).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
  }

  addObjectifTopServiceForCurrentYear(){
    this.objectService.addObjectifTopService({ 
      id: undefined,
      year: this.currentYear,
      indicateur_filial: 0}).subscribe(
        res => {

        },
        err => {

        }
      );
  }

  updateObjectifTopService(){
    this.objectService.updateObjectifTopServiceData(this.objectifTopService)
    .subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  updateObjectifVolume(){
    this.objectService.updateObjectifVolumeData(this.objectifVolume)   
     .subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );;
  }
}
