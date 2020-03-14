import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RootPageComponent } from './root-page/root-page.component';
import { TmgPageComponent } from './tmg-page/tmg-page.component';
import { GerantPageComponent } from './gerant-page/gerant-page.component';
import { ListComponent } from './common/list/list.component';
import { CreateUserModalComponent } from './common/create-user-modal/create-user-modal.component';
import { ViewUserModalComponent } from './common/view-user-modal/view-user-modal.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { StationServiceManagementComponent } from './station-service-management/station-service-management.component';
import { CreateStationServiceModalComponent } from './common/create-station-service-modal/create-station-service-modal.component';
import { ViewStationServiceModalComponent } from './common/view-station-service-modal/view-station-service-modal.component';
import { RealisationCardComponent } from './common/realisation-card/realisation-card.component';
import { UpdateRealisationVolumeComponent } from './common/update-realisation-volume/update-realisation-volume.component';
import { ObjectifManagementComponent } from './objectif-management/objectif-management.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RootPageComponent,
    TmgPageComponent,
    GerantPageComponent,
    ListComponent,
    CreateUserModalComponent,
    ViewUserModalComponent,
    UserManagementComponent,
    StationServiceManagementComponent,
    CreateStationServiceModalComponent,
    ViewStationServiceModalComponent,
    RealisationCardComponent,
    UpdateRealisationVolumeComponent,
    ObjectifManagementComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
