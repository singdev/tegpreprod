import { Component, OnInit } from '@angular/core';
import { StationService } from '../logic/station-service';
import { StationServiceService } from '../services/station-service.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../logic/user';

@Component({
  selector: 'app-gerant-page',
  templateUrl: './gerant-page.component.html',
  styleUrls: ['./gerant-page.component.css']
})
export class GerantPageComponent implements OnInit {

  selectedMenu: string;

  stationService: StationService;
  gerant: User;
  showMyStationService: boolean;
  photoUrl: string;
  user: User;

  constructor(private stationServiceService: StationServiceService, 
    private authService: AuthService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.selectedMenu = 'accueil';
    this.getUserStationService();
    this.getPhoto();
    this.user = this.authService.getAuthenticatedUser();
  }

  setSelectedMenu(menu: string){
    this.selectedMenu = menu;
  }

  getPhoto(){
    const user = this.authService.getAuthenticatedUser();
    this.userService.getPhotoProfile(user).subscribe(
      res => {
        this.photoUrl = `http://${URL}/users/${user.id}/photo-profil`;
      },
      err => {
        if(err.status != 404){
          this.photoUrl = err.url;
        }
      }
    )
  }

  getUserStationService(){
    const userId = this.authService.getAuthenticatedUser().id;
    this.stationServiceService.getWorkerStationService(userId).subscribe(
      res => {
        if(res[0]){
          this.stationServiceService.getStationService(res[0].id).subscribe(
            res => {
              this.stationService = res;
              this.getStationServiceGerant();
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

  getStationServiceGerant(){
    this.userService.getUser(this.stationService.gerant).subscribe(
      res => {
        this.gerant = res;
      }
    )
  }

  displayStationServiceInformations(){
    this.showMyStationService = true;
  }

  hideStationServiceInformations(){
    this.showMyStationService = false;
  }
}
