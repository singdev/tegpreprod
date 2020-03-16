import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../logic/user';

@Component({
  selector: 'app-root-page',
  templateUrl: './root-page.component.html',
  styleUrls: ['./root-page.component.css']
})
export class RootPageComponent implements OnInit {

  currentMenu: string;
  
  userTableRows: Array<Array<String>>;
  users: Array<User>;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.currentMenu = 'fg-users';
    this.loadAllUser();
  }

  loadAllUser(){
    this.userService.getAllUsers().subscribe(
      res => {
        this.users = res;
        const array = [];
        res.forEach(user => {
          array.push([
            user.fullname, user.username, user.email, user.phone, user.role
          ])
        });
        this.userTableRows = array;
        console.log(this.userTableRows);
      },

      err => {

      }
    )
  }

  toggleMenu(id: string){
    this.currentMenu = id;
  }

}
