import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/logic/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.css']
})
export class DropdownMenuComponent implements OnInit {

  showMenu: boolean;
  showProfile:boolean;
  user: User;

  constructor(private authService: AuthService, private userService: UserService) { }

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
}
