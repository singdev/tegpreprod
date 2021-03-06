import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

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
import { DropdownMenuComponent } from './common/dropdown-menu/dropdown-menu.component';
import { MyStationServiceComponent } from './my-station-service/my-station-service.component';
import { GerantAccueilComponent } from './gerant-accueil/gerant-accueil.component';
import { WikiComponent } from './common/wiki/wiki.component';
import { WikiStationComponent } from './wiki-station/wiki-station.component';
import { ActuManagementComponent } from './common/actu-management/actu-management.component';
import { CreateActuModalComponent } from './common/create-actu-modal/create-actu-modal.component';
import { ViewActuComponent } from './view-actu/view-actu.component';
import { ForumSubjectComponent } from './forum-subject/forum-subject.component';
import { ForumPostComponent } from './forum-post/forum-post.component';
import { CreateSubjectModalComponent } from './common/create-subject-modal/create-subject-modal.component';
import { ExcelComponent } from './common/excel/excel.component';

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
    ObjectifManagementComponent,
    DropdownMenuComponent,
    MyStationServiceComponent,
    GerantAccueilComponent,
    WikiComponent,
    WikiStationComponent,
    ActuManagementComponent,
    CreateActuModalComponent,
    ViewActuComponent,
    ForumSubjectComponent,
    ForumPostComponent,
    CreateSubjectModalComponent,
    ExcelComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AngularEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
