import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { User } from '../logic/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  userTableHeaders: Array<String>;
  @Input() userTableRows: Array<Array<String>>;
  @Input() users: Array<User>;
  
  showCreateUserModal: boolean;
  showViewUserModal: boolean;
  currentUserView: User;

  @Output() loadRequestEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    this.userTableHeaders = [
      'Nom et prénom', "Nom d'utilisateur", "Email", "Téléphone", "Role"
    ];
    this.showCreateUserModal = false;
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
      this.loadRequestEvent.emit(true);
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
    this.loadRequestEvent.emit(true);
    this.hideViewUserDialog();
  }
}
