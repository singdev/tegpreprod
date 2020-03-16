import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../logic/user';
import { StationService } from '../logic/station-service';
import { StationServiceService } from '../services/station-service.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-my-station-service',
  templateUrl: './my-station-service.component.html',
  styleUrls: ['./my-station-service.component.css']
})
export class MyStationServiceComponent implements OnInit {

  @Input() stationService: StationService;
  @Input() gerant: User;

  @Output() closeEvent = new EventEmitter<boolean>();

  userTableRows: Array<Array<String>>;
  users: Array<User>;

  photoUrl: string;
  openStreetMapLink: string;

  constructor(private ssService: StationServiceService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.loadAllUser();
  }

  close(){
    this.closeEvent.emit(true);
  }

  loadAllUser() {
    this.userService.getAllUsers().subscribe(
      res => {
        const allUser = res;
        this.ssService.getAllWorkerStationService(this.stationService.id).subscribe(
          res => {
            const emplyes: Array<User> = [];
            const array = [];
            console.log(res);
            allUser.forEach(user => {
              if (res.find(e => e.employe == user.id)) {
                array.push([
                  user.fullname, user.username, user.email, user.phone, user.role
                ]);
                emplyes.push(user);
              }
            });
            this.userTableRows = array;
            this.users = emplyes;
            console.log(this.userTableRows);
          }
        );

      },

      err => {

      }
    )
  }
}
