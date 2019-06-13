import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { LocalStorageService } from '../../localstorage.service';


@Component({
  selector: 'app-pagina-footer',
  templateUrl: './pagina-footer.component.html',
  styleUrls: ['./pagina-footer.component.scss'],
})
export class PaginaFooterComponent implements OnInit, AfterViewInit {

  private rotaLogin = 'cliente/login';
  private rotaDetalhe = 'cliente';
  public rota = 'login';
  constructor(private router: Router, private localService: LocalStorageService) {
      this.localService.itemValue.subscribe( itemValue => {
        if (localStorage.getItem('logged') === null) {
          this.rota = this.rotaLogin;
        } else {
          this.rota = this.rotaDetalhe;
        }
      });
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    if (localStorage.getItem('logged') === null) {
      this.rota = this.rotaLogin;
    } else {
      this.rota = this.rotaDetalhe;
    }
  }

  goToRoute(route: string) {
    this.router.navigateByUrl(route);
  }
}
