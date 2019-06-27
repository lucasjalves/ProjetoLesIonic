import { Component, OnInit, Input, AfterViewInit, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-carregando',
  templateUrl: './carregando.component.html',
  styleUrls: ['./carregando.component.scss'],
})
export class CarregandoComponent implements OnInit, AfterContentInit {

  @Input() public carregando = true;
  @Input() public qtdeLinhas = 1;
  public qtde = new Array(0);
  constructor() { }

  ngOnInit() {}

  ngAfterContentInit() {
    this.inicializarArray();
  }

  async inicializarArray() {
    this.qtde = new Array(this.qtdeLinhas);
  }
}
