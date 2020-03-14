import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StationService } from 'src/app/logic/station-service';
import { StationServiceService } from 'src/app/services/station-service.service';
import { User } from 'src/app/logic/user';
import { UserService } from 'src/app/services/user.service';
import { RealisationTopService } from 'src/app/logic/realisation-top-service';
import { RealisationTopServiceService } from 'src/app/services/realisation-top-service.service';

@Component({
  selector: 'app-view-station-service-modal',
  templateUrl: './view-station-service-modal.component.html',
  styleUrls: ['./view-station-service-modal.component.css']
})
export class ViewStationServiceModalComponent implements OnInit {
  @Input() stationService: StationService;
  @Output() closeModal = new EventEmitter();

  lat: number;
  lng: number;
  users: Array<User>;

  realisationTopService: RealisationTopService;


  constructor(private stationServiceService: StationServiceService,
     private realisationTopServiceService: RealisationTopServiceService,
     private userService: UserService) { }

  ngOnInit(): void {
    this.lat = this.stationService.emplacement.x;
    this.lng = this.stationService.emplacement.y;
    this.loadAllGerant();
    this.loadTopServiceForCurrentYear();
  }

  loadAllGerant(){
    this.userService.getAllGerants().subscribe(
      res => {
        this.users = res;
      }
    )
  }

  cancel(){
    this.closeModal.emit();
  }

  updateStationService(){
    this.stationService.emplacement = `(${this.lat}, ${this.lng})`;
    this.stationServiceService.updateStationServiceData(this.stationService).subscribe(
      res => {
      },
      err => {
      } 
    )
  }

  updateTopService(){
    console.log(this.realisationTopService);
    this.realisationTopServiceService.updateRealisationTopServiceData(this.realisationTopService)
    .subscribe(
      res => {
        console.log(res);
      },
      err => {
        if(err.status == 201){
          this.loadTopServiceForCurrentYear();
        }
      }
    )
  }

  getCurrentYear(){
    return new Date().getFullYear();
  }

  loadTopServiceForCurrentYear(){
    this.realisationTopServiceService
    .getRealisationTopServiceByYear(this.getCurrentYear(),
     this.stationService.id).subscribe(
        res => {
          if(res.length == 0){
            this.createTopServiceForCurrentYear();
            this.loadTopServiceForCurrentYear();
          } else {console.log(res);

            this.realisationTopService = res[0];
          }
        }
    );
  }

  createTopServiceForCurrentYear(){
    this.realisationTopServiceService.addRealisationTopService({
      ss: this.stationService.id,
      n_s1: 0,
      n_s2: 0,
      year: this.getCurrentYear(),
      id: undefined
    }).subscribe(
      res => {
        console.log(res);
      }
    );
  }

}
