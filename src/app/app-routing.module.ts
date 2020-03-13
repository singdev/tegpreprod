import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RootPageComponent } from './root-page/root-page.component';
import { GerantPageComponent } from './gerant-page/gerant-page.component';
import { TmgPageComponent } from './tmg-page/tmg-page.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'root', component: RootPageComponent, canActivate: [AuthGuardService] },
  { path: 'gerant', component: GerantPageComponent,  canActivate: [AuthGuardService]},
  { path: 'tmg', component: TmgPageComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
