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

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RootPageComponent,
    TmgPageComponent,
    GerantPageComponent,
    ListComponent,
    CreateUserModalComponent,
    ViewUserModalComponent
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
