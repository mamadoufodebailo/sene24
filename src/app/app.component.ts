import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {ApiRepositoryService} from "./repository/api-repository.service";
import {LienModel} from "./models/lien.model";
import {Storage} from "@ionic/storage";
import {GestionRepositoryService} from "./repository/gestion-repository.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public lien = new LienModel();
  donnees: any;
  public appPages = [
      {
        title: 'Home',
        url: '/home',
        icon: 'home'
      },
      {
        title: 'Videos',
          url: '/video',
          icon: 'videocam'
      },
      {
        title: 'Sene24 TV',
          url: '/television',
          icon: 'tv'
      },
      {
          title: 'Politique',
          url: '/politique',
          icon: 'journal'
      },
      {
          title: 'Sociéte',
          url: '/societe',
          icon: 'contacts'
      },
      {
          title: 'Economie',
          url: '/economie',
          icon: 'business'
      },
      {
          title: 'Sports',
          url: '/sport',
          icon: 'walk'
      },
      {
          title: 'International',
          url: '/international',
          icon: 'globe'
      },
      {
          title: 'TIC',
          url: '/telecommunication',
          icon: 'map'
      },
      {
          title: 'Revue de presse',
          url: '/presse',
          icon: 'paper'
      },
      {
          title: 'Contact',
          url: '/contact',
          icon: 'contact'
      },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private gestion: GestionRepositoryService
  ) {
    this.initializeApp();
    this.lien = this.gestion.getElement();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
