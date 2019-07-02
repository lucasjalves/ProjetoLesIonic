import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidoService } from '../service/pedido.service';
import { ClienteService } from 'src/app/cliente/service/cliente.service';
import { Pedido } from '../model/pedido.model';
import { Resultado } from 'src/app/common/resultado.model';
import { Cliente } from 'src/app/cliente/model/cliente.model';

@Component({
  selector: 'app-detalhe-pedido',
  templateUrl: './detalhe-pedido.component.html',
  styleUrls: ['./detalhe-pedido.component.scss'],
})
export class DetalhePedidoComponent implements OnInit {

  public mapIcones = {
    SOLICITADO: {
      icone : 'alert',
      color: 'yellow'
    },
    PAGO: {
      icone: 'time',
      color: 'green'
    },
    TRANSPORTE: {
      icone: 'airplace',
      color: 'green'
    },
    ENTREGUE: {
      icone: 'checkmark',
      color: 'green'
    },
    CANCELADO: {
      icone: 'close',
      color: 'red'
    },
    TROCADO: {
      icone: 'swap',
      color: 'yellow'
    }
  };
  public cartoesSelecionados;
  public apiCalled = false;
  public pedido = new Pedido();
  public cliente: Cliente = new Cliente();
  constructor(private activedRoute: ActivatedRoute,
              private pedidoService: PedidoService,
              private clienteService: ClienteService) { }

  ngOnInit() {}

  ionViewDidEnter() {
    this.activedRoute.queryParams.subscribe( params => {
      this.pedidoService.consultarById(params.id).subscribe(res => {
        const resultado = new Resultado<Pedido>(new Pedido()).deserialize(res);
        this.pedido = resultado.entidades[0];
        const c = JSON.parse(localStorage.getItem('logged'));
        const cli = new Cliente().deserialize(c);
        console.log(this.pedido);
        this.clienteService.getById(this.pedido.idCliente).subscribe(response => {
          const result = new Resultado<Cliente>(new Cliente()).deserialize(response);
          this.cliente = result.entidades[0];
          this.apiCalled = true;
        });
      });
    });
  }
}
