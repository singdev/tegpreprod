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
  

  constructor() { }

  ngOnInit(): void {
    this.currentMenu = 'fg-users';
  }

  toggleMenu(id: string){
    this.currentMenu = id;
  }

}
