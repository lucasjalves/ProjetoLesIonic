import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LocalStorageService } from './common/localstorage.service';
import { ClienteService } from './cliente/service/cliente.service';
import {StatusClienteService } from './common/service/status-cliente-service.service';

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
      title: 'Pedidos',
      url: '/pedido/cliente',
      icon: 'clipboard'
    },
    {
      title: 'Tickets',
      url: '/ticket',
      icon: 'list-box'
    },
    {
      title: 'Dados cadastrais',
      url: '/cliente',
      icon: 'body'
    },
    {
      title: 'Cartões',
      url: '/cliente/cartoes',
      icon: 'card'
    },
    {
      title: 'Endereços',
      url: '/cliente/enderecos/listar',
      icon: 'car'
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
      url: 'cliente/login',
      icon: 'contact'
    },
    {
      title: 'Criar conta',
      url: '/cliente/cadastro',
      icon: 'contact'
    }
  ];

  public appPagesAdmin = [
    {
      title: 'Pedidos',
      url: 'gestao/pedidos',
      icon: 'clipboard'
    },
    {
      title: 'Tickets',
      url: 'gestao/pedidos',
     icon: 'list-box'
    },
    {
      title: 'Produtos',
      url: 'gestao/produtos',
      icon: 'cube'
    },
    {
      title: 'Clientes',
      url: 'gestao/clientes',
      icon: 'cube'
    }
  ];

  public logged = null;
  public isAdmin = false;
  public isActive = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private localStorageService: LocalStorageService,
    private statusClienteService: StatusClienteService,
    private clienteService: ClienteService
  ) {
    this.initializeApp();
    localStorageService.itemValue.subscribe( res => {
      this.logged = localStorage.getItem('logged');
    });
    this.logged = localStorage.getItem('logged');

    this.inscrever();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  inscrever() {
    this.statusClienteService.isActive.subscribe(status => {
      console.log(status);
      this.isActive = status as boolean;
    });

    this.statusClienteService.isAdmin.subscribe(status => {
      this.isAdmin = status as boolean;
    });

    const cliente = this.clienteService.getClienteLogado();
    if (cliente != null) {
      this.clienteService.isActive(cliente.cpfCnpj).subscribe(res => {
        this.statusClienteService.isActive.next(res);
      });

      this.clienteService.isAdmin(cliente.cpfCnpj).subscribe(res => {
        this.statusClienteService.isAdmin.next(res);
      });
    }
  }
}
