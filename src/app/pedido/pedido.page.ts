import { Component, OnInit } from '@angular/core';
import { PedidoService } from './service/pedido.service';
import { Pedido } from './model/pedido.model';
import { Cliente } from '../cliente/model/cliente.model';
import { Resultado } from '../common/resultado.model';

@Component({
  selector: 'app-cliente-pedido',
  templateUrl: './pedido-cliente.page.html',
  styleUrls: ['./pedido-cliente.page.scss'],
})
export class PedidoClientePage implements OnInit {

  public apiCalled = false;
  public pedidos: Array<Pedido> = new Array();
  constructor(private pedidoService: PedidoService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    const user = localStorage.getItem('logged');
    const cliente = new Cliente().deserialize(JSON.parse(user));

    this.pedidoService.consultarPedidosPorCliente(cliente.cpfCnpj).subscribe( res => {
      this.apiCalled = true;
      const resultado = new Resultado<Pedido>(new Pedido()).deserialize(res);
      this.pedidos = resultado.entidades;
    });
  }
}
