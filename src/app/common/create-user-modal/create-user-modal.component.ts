import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/logic/user';
import { StationServiceService } from 'src/app/services/station-service.service';

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.css']
})
export class CreateUserModalComponent implements OnInit {

  user: User;
  @Input() ssId: number;
  @Input() isEmploye: number;

  @Output() closeModal = new EventEmitter<boolean>();

  constructor(private userService: UserService, 
    private ssService: StationServiceService) { }

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
          if(this.isEmploye){
            this.userService.getAllUsers().subscribe(res => {
              const id = res.find(u => u.username == this.user.username).id;
              this.ssService.addStationServiceWorker(this.ssId, id).subscribe(res => {}, err => {
                console.log(err);
              })
            });
          }
          console.log(err);
        } else {
          alert("Cette enregistrment ne peut pas être effectué !");
        }

      }
    )
  }

}
