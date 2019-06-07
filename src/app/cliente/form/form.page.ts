import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Cliente } from '../model/cliente.model';
import { ClienteService } from '../service/cliente.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { Resultado } from '../../common/resultado.model';
import { ModalHelper } from '../../common/modal.helper';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.scss'],
})
export class ClienteFormComponent implements OnInit, AfterViewInit {

  @Input() public cliente: Cliente = new Cliente();
  public dataMinima: string;
  public dataMax: string;
  @Input() public tituloBotao: string;
  @Input() public funcao: () => void;
  @Input() public cadastro = false;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.gerarData();
  }

  gerarData() {
    const data = new Date();
    const dataMax = new Date();
    data.setFullYear(data.getFullYear() - 100);
    dataMax.setFullYear(dataMax.getFullYear() - 18);
    this.dataMinima = data.toLocaleDateString().split('/').reverse().join('-');
    this.dataMax = dataMax.toLocaleDateString().split('/').reverse().join('-');
  }
}
