import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PedidoService } from '../service/pedido.service';
import { Pedido } from '../model/pedido.model';
import { Resultado } from '../../common/resultado.model';
import { Ticket } from '../../ticket/model/ticket.model';
import { ItemPedidoTiket } from 'src/app/ticket/model/item-pedido-ticket.model';

@Component({
  selector: 'app-pedido-troca',
  templateUrl: './pedido-troca.component.html',
  styleUrls: ['./pedido-troca.component.scss'],
})
export class PedidoTrocaComponent implements OnInit {

  public apiCalled = false;
  public pedido =  new Pedido();
  public ticket = new Ticket();
  public isInvalid = true;
  constructor(private router: Router,
              private pedidoService: PedidoService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {}

  ionViewDidEnter() {
    this.activatedRoute.queryParams.subscribe( param => {
      this.pedidoService.consultarById(param.id).subscribe( res =>  {
        this.apiCalled = true;
        const resultado =  new Resultado(new Pedido()).deserialize(res);
        this.pedido = resultado.entidades[0];
        this.gerarModelTicket();
      });
    });
  }

  gerarModelTicket() {
    this.pedido.itemPedido.forEach( (item, index) => {
      this.ticket.itens.push(new ItemPedidoTiket());
    });

    this.ticket.idPedido = this.pedido.id;
    this.ticket.idCliente = this.pedido.idCliente;
  }

  efetivarTroca() {

  }

  verificarFormValido() {
    let qtde = 0;
    this.ticket.itens.forEach( item => {

      if (item.quantidade !== null) {
        qtde = parseInt(qtde, 10) + parseInt(item.quantidade, 10);
      }

    });
    this.isInvalid = (qtde === 0);
  }
}
