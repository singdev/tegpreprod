import { Component, OnInit } from '@angular/core';
import { StationService } from '../logic/station-service';
import { StationServiceService } from '../services/station-service.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-gerant-page',
  templateUrl: './gerant-page.component.html',
  styleUrls: ['./gerant-page.component.css']
})
export class GerantPageComponent implements OnInit {

  selectedMenu: string;

  stationService: StationService;

  constructor(private stationServiceService: StationServiceService, 
    private authService: AuthService) { }

  ngOnInit(): void {
    this.selectedMenu = 'accueil';
    this.getUserStationService();
  }

  setSelectedMenu(menu: string){
    this.selectedMenu = menu;
  }

  getUserStationService(){
    const userId = this.authService.getAuthenticatedUser().id;
    this.stationServiceService.getWorkerStationService(userId).subscribe(
      res => {
        if(res[0]){
          this.stationServiceService.getStationService(res[0].id).subscribe(
            res => {
              this.stationService = res;
            },
            err => {
              console.log(err);
            }
          )
        }
      },
      err => {
        console.log(err);        
      }
    )
  }
}
