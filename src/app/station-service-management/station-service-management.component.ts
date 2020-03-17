import { Component, OnInit } from '@angular/core';
import { StationService } from '../logic/station-service';
import { StationServiceService } from '../services/station-service.service';
import { UserService } from '../services/user.service';
import { User } from '../logic/user';

@Component({
  selector: 'app-station-service-management',
  templateUrl: './station-service-management.component.html',
  styleUrls: ['./station-service-management.component.css']
})
export class StationServiceManagementComponent implements OnInit {

  stationServiceTableHeaders: Array<String>;
  stationServiceTableRows: Array<Array<String>>;
  stationServices: Array<StationService>;
  
  showCreateStationServiceModal: boolean;
  showViewStationServiceModal: boolean;
  currentStationServiceView: StationService;

  constructor(private stationServiceService: StationServiceService, private userService: UserService) { }

  ngOnInit(): void {
    this.stationServiceTableHeaders = [
      "Nom", "SAP", "Téléphone", "Gérant", "Ville"
    ];
    this.showCreateStationServiceModal = false;
    this.loadData();
  }

  loadFormExcel(json){
    json.forEach( ss => {
      if(ss.id){
        this.stationServiceService.updateStationServiceData(ss).subscribe(
          res =>{},
          err => {
            console.log(err);
          }
        );
      } else {
        this.stationServiceService.addStationService(ss).subscribe(
          res =>{},
          err => {
            console.log(err);
          }
        )
      }
    });
  }

  loadAllStationService(gerants: Array<User>){
    this.stationServiceService.getAllStationServices().subscribe(
      res => {
        this.stationServices = res;
        const array = [];
        res.forEach(stationService => {
          const gerant = gerants.find(value => value.id == stationService.gerant);
          array.push([
            stationService.name, stationService.sap, stationService.phone, gerant.fullname, stationService.ville
          ])
        });
        this.stationServiceTableRows = array;
        console.log(this.stationServiceTableRows);
      },

      err => {

      }
    )
  }

  loadData(){
    this.userService.getAllGerants().subscribe(
      gerants => {
        this.loadAllStationService(gerants);
      }
    );
  }

  displayCreateStationServiceDialog(){
    this.showCreateStationServiceModal = true;
  }

  hideCreateStationServiceDialog(){
    this.showCreateStationServiceModal = false;
  }

  displayViewStationServiceDialog(){
    this.showViewStationServiceModal = true;
  }

  hideViewStationServiceDialog(){
    this.showViewStationServiceModal = false;
  }

  onStationServiceCreated(success: boolean){
    if(success){
      this.loadData();
      this.hideCreateStationServiceDialog();
    } else {
      this.hideCreateStationServiceDialog();
    }
  }

  onStationServiceTableRowClick(index) {
    this.currentStationServiceView = this.stationServices[index];
    this.displayViewStationServiceDialog();
  }

  onStationServiceCancelView(){
    this.loadData();
    this.hideViewStationServiceDialog();
  }

}
