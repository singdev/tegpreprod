import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/logic/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { URL } from 'src/app/common/remote';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.css']
})
export class DropdownMenuComponent implements OnInit {

  showMenu: boolean;
  showProfile:boolean;
  user: User;
  photoUrl: string;

  newPassword: string;
  confirmNewPassword: string;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.showMenu = false;
    this.loadAuthenticatedUser();
  }

  dropdown(){
      this.showMenu = !this.showMenu;
  }

  loadAuthenticatedUser(){
    let user = this.authService.getAuthenticatedUser();
    this.userService.getUser(user.id).subscribe(
      res => {
        this.user = res;
        this.getUserPhotoProfile();
      },
      err => {
        console.log(err);
      }
    );

  }

  getUserInitials(){
    return this.user.fullname != null ? this.user.fullname.charAt(0) : 'R';
  }

  displayProfile(){
    this.showProfile = true;
    this.showMenu = false;
  }

  hideProfile(){
    this.showProfile = false;
  }

  logout(){
    this.authService.removeToken();
    this.router.navigate(['login']);
  }

  updatePersonalInformation(){
    this.userService.updateUserData(this.user).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
        if(err.status == 201){
          alert("Modifications enreigstré");
        }
      }
    );
  }

  changePassword(){
    if(this.newPassword === this.confirmNewPassword){
      this.userService.changeUserPassword(this.newPassword, this.user.id).subscribe(
        res => {},
        err => { 
          if(err.status == 201){
            alert('Modification du mot de passe effectué');
          }
          console.log(err); 
        }
      );
    } else {
      alert('Les deux mot de passe doivent être identique');
    }
  }

  changeUserPhoto(event){
    let fileList: FileList = event.target.files;
    if(fileList.length > 0){
      const file: File = fileList.item(0);
      this.userService.createPhoto(file, this.user).subscribe(
        res => { },
        err => {
          if(err.status == 201){
            this.getUserPhotoProfile();
          } else {
            this.userService.changePhoto(file, this.user).subscribe(
              res => { },
              err => {
                console.log(err.status);
                if(err.status == 201){
                  this.getUserPhotoProfile();
                } 
              });
          }
        }
      )

    }
  }

  getUserPhotoProfile(){
    this.photoUrl = undefined;
    this.userService.getPhotoProfile(this.user).subscribe(
      res => {
        this.photoUrl = `http://${URL}/users/${this.user.id}/photo-profil`;
      },
      err => {
        console.log(err);
        console.log('photo de profil');
        this.photoUrl = err.url;
      }
    );
  }
}
