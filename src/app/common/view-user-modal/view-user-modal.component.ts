import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { User } from 'src/app/logic/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-user-modal',
  templateUrl: './view-user-modal.component.html',
  styleUrls: ['./view-user-modal.component.css']
})
export class ViewUserModalComponent implements OnInit {

  @Input() user: User;
  @Output() closeModal = new EventEmitter();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  cancel(){
    this.closeModal.emit();
  }

  updateUser(){
    this.userService.updateUserData(this.user).subscribe(
      res => {
        console.log(this.user);
        console.log(res);
      },
      err => {
        console.log(this.user);
        console.log(err);
      } 
    )
  }

}
