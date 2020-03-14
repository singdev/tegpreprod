import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StationService } from 'src/app/logic/station-service';
import { StationServiceService } from 'src/app/services/station-service.service';
import { User } from 'src/app/logic/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-station-service-modal',
  templateUrl: './create-station-service-modal.component.html',
  styleUrls: ['./create-station-service-modal.component.css']
})
export class CreateStationServiceModalComponent implements OnInit {

  stationService: StationService;
  users: Array<User>;
  lat: number;
  lng: number;

  @Output() closeModal = new EventEmitter<boolean>();

  constructor(private stationServiceService: StationServiceService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.stationService = new StationService();
    this.loadAllGerant();
  }

  cancel(){
    this.closeModal.emit(false);
  }

  loadAllGerant(){
    this.userService.getAllGerants().subscribe(
      res => {
        this.users = res;
      }
    )
  }

  createStationService(){
    this.stationService.emplacement = `(${this.lat}, ${this.lng})`;
    this.stationServiceService.addStationService(this.stationService).subscribe(
      res => {
        this.closeModal.emit(true);
      },

      err => {

        if(err.status == 201){
          this.closeModal.emit(true);
        } else {
          alert("Cette enregistrment ne peut pas être effectué !");
        }

      }
    )
  }
}
