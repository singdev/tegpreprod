import { Component, OnInit } from '@angular/core';
import { User } from '../logic/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  userTableHeaders: Array<String>;
  userTableRows: Array<Array<String>>;
  users: Array<User>;
  
  showCreateUserModal: boolean;
  showViewUserModal: boolean;
  currentUserView: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userTableHeaders = [
      'Nom et prénom', "Nom d'utilisateur", "Email", "Téléphone", "Role"
    ];
    this.showCreateUserModal = false;
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

  displayCreateUserDialog(){
    this.showCreateUserModal = true;
  }

  hideCreateUserDialog(){
    this.showCreateUserModal = false;
  }

  displayViewUserDialog(){
    this.showViewUserModal = true;
  }

  hideViewUserDialog(){
    this.showViewUserModal = false;
  }

  onUserCreated(success: boolean){
    if(success){
      this.loadAllUser();
      this.hideCreateUserDialog();
    } else {
      this.hideCreateUserDialog();
    }
  }

  onUserTableRowClick(index) {
    this.currentUserView = this.users[index];
    console.log(this.currentUserView);
    this.displayViewUserDialog();
  }

  onUserCancelView(){
    this.loadAllUser();
    this.hideViewUserDialog();
  }
}
