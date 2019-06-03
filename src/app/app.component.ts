import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LocalStorageService } from './common/localstorage.service';

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
      title: 'Carrinho',
      url: '/carrinho',
      icon: 'cart'
    },
    {
      title: 'Dados cadastrais',
      url: '/cliente/dados',
      icon: 'body'
    },
    {
      title: 'Cartões',
      url: '/cliente/cartoes',
      icon: 'card'
    },
    {
      title: 'Pedidos',
      url: '/cliente/pedidos',
      icon: 'clipboard'
    },
    {
      title: 'Tickets',
      url: '/cliente/tickets',
      icon: 'list-box'
    }
  ];

  public appPagesNotLogged = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'contact'
    },
    {
      title: 'Criar conta',
      url: '/cliente/cadastro',
      icon: 'contact'
    }
  ];


  public logged = null;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private localStorageService: LocalStorageService
  ) {
    this.initializeApp();
    localStorageService.itemValue.subscribe( res => {
      this.logged = localStorage.getItem('logged');
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
