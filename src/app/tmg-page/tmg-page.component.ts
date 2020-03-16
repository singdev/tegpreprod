import { Component, OnInit } from '@angular/core';
import { URL } from '../common/remote';
import { from } from 'rxjs';
import { StationService } from '../logic/station-service';
import { User } from '../logic/user';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tmg-page',
  templateUrl: './tmg-page.component.html',
  styleUrls: ['./tmg-page.component.css']
})
export class TmgPageComponent implements OnInit {

  selectedMenu: string;

  stationService: StationService;
  gerant: User;
  photoUrl: string;
  user: User;
  

  showCreateActuModal: boolean;

  constructor( 
    private authService: AuthService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.selectedMenu = 'accueil';
    this.getPhoto();
    this.user = this.authService.getAuthenticatedUser();
    this.showCreateActuModal = false;
  }

  setSelectedMenu(menu: string){
    this.selectedMenu = menu;
    this.showCreateActuModal = false;
  }

  displayCreateActuModal(){
    this.showCreateActuModal = true;
  }

  hideCreateActuModel(){
    this.showCreateActuModal = false;
  }

  onCloseActuModal(success){
    this.hideCreateActuModel();
    if(success){

    }
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
}
