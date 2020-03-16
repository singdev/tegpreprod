import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  username: string;
  password: string;
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.username = "";
    this.password = "";
  }

  login(){
    this.authService.authenticate(this.username, this.password)
    .subscribe(res => {
      console.log(res);
      if(res["token"]){
        const helper = new JwtHelperService();
        const userData = helper.decodeToken(res["token"]);
        let path = '';
        if(userData.user.role == "ROOT"){
          path = 'root';
        } else if(userData.user.role == "GERANT" || userData.user.role == "EMPLOYE_SS"){
          path = 'gerant';
        } else if(userData.user.role == "TMG"){
          path = 'tmg';
        }
        this.authService.persistToken(res['token']);
        this.router.navigate([path]);
      } else {
        alert("Les identifiants que vous avez entrés ne sont pas reconnu par le système");
      }
    }, err => {
      console.log(err);
      alert("Identifiants incorrecte");
    });
  }

}
