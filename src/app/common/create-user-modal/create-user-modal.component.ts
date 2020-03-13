import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/logic/user';

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.css']
})
export class CreateUserModalComponent implements OnInit {

  user: User;

  @Output() closeModal = new EventEmitter<boolean>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = new User();
  }

  cancel(){
    this.closeModal.emit(false);
  }

  createUser(){
    this.user.password = 'changemoi';
    this.userService.addUser(this.user).subscribe(
      res => {
        console.log(res);
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
