import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {ApiRepositoryService} from "./repository/api-repository.service";
import {HttpClientModule} from "@angular/common/http";
import {IonicStorageModule} from "@ionic/storage";
import {PageSuiteDetailPageModule} from "./page-suite-detail/page-suite-detail.module";
import {GestionRepositoryService} from "./repository/gestion-repository.service";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule,
      IonicStorageModule.forRoot(),
      PageSuiteDetailPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      ApiRepositoryService,
      GestionRepositoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
