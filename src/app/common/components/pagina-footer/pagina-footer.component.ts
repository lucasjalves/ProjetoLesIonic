import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';


@Component({
  selector: 'app-pagina-footer',
  templateUrl: './pagina-footer.component.html',
  styleUrls: ['./pagina-footer.component.scss'],
})
export class PaginaFooterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  goToRoute(route: string) {
    this.router.navigateByUrl(route);
  }
}
