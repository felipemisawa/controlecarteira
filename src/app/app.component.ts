import { Component } from '@angular/core';

import { Platform, NavController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './core/services/auth.service';
import { OverlayService } from './core/services/overlay.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  pages: {
    url?: string;
    direction?: string;
    icon: string;
    text: string;
    open?: boolean;
    children?: {
      url: string;
      direction: string;
      icon: string;
      text: string;
    }[];
  }[];
  disableMenu: boolean;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private menuCtrl: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.pages = [
      {
        url: '/stocks',
        direction: 'root',
        icon: 'home',
        text: 'Home'
      },
      {
        icon: 'checkmark',
        text: 'Stocks',
        open: false,
        children: [
          { url: '/orders', direction: 'forward', icon: 'menu', text: 'Orders' },
          { url: '/orders/create', direction: 'forward', icon: 'add', text: 'Add Order' },
          { url: '/dividends', direction: 'forward', icon: 'menu', text: 'Dividends' }
        ]
      }
    ];
    this.disableMenu = !this.authService.isAuthenticated;
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async logout(): Promise<void> {
    await this.overlayService.alert({
      message: 'Do you really want to logout?',
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            await this.authService.logout();
            await this.menuCtrl.enable(false, 'main-menu');
            this.navCtrl.navigateRoot('/login');
          }
        },
        'No'
      ]
    });
  }
}
