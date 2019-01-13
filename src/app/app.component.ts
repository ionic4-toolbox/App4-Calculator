import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    console.log('AppComponent::constructur | ');

    this.initializeApp();
  }

  initializeApp() {
    console.log('AppComponent::constructur | ');

    this.platform.ready().then(() => {
      console.log('AppComponent::constructur | platform.ready');

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
