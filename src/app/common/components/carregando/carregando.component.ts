import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-carregando',
  templateUrl: './carregando.component.html',
  styleUrls: ['./carregando.component.scss'],
})
export class CarregandoComponent implements OnInit, AfterViewInit {

  @Input() private carregando = true;
  @Input() private qtdeLinhas = 1;
  public qtde = new Array(0);
  constructor() { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.inicializarArray();
  }

  async inicializarArray() {
    this.qtde = new Array(this.qtdeLinhas);
  }
}
