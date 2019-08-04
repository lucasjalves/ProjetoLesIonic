import { Component, OnInit } from '@angular/core';
import { TicketService } from '../service/ticket-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../model/ticket.model';
import { Resultado } from 'src/app/common/resultado.model';
import { Pedido } from 'src/app/pedido/model/pedido.model';
import { PedidoService } from 'src/app/pedido/service/pedido.service';
import { ItemPedidoTiket } from '../model/item-pedido-ticket.model';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { ModalHelper } from 'src/app/common/modal.helper';

@Component({
  selector: 'app-detalhe-ticket',
  templateUrl: './detalhe-ticket.component.html',
  styleUrls: ['./detalhe-ticket.component.scss'],
})
export class TicketDetalheComponent implements OnInit {

  private arrayIds = new Array<number>();
  public mapIcones = {
    SOLICITADO: {
      icone : 'alert',
      color: 'yellow'
    },
    APROVADO: {
      icone: 'clock',
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

  public apiCalled = false;
  public ticket = new Ticket();
  public pedido = new Pedido();
  public admin = false;
  constructor(private ticketService: TicketService,
              private activatedRoute: ActivatedRoute,
              private pedidoService: PedidoService,
              private router: Router,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private modalHelper: ModalHelper) { }

  ngOnInit() {}

  ionViewDidEnter() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.admin = params.admin as boolean;
      this.ticketService.buscarPorId(params.id).subscribe(res => {
        const resultado = new Resultado(this.ticket).deserialize(res);
        this.ticket = resultado.entidades[0];
        this.buscarPedido(this.ticket);
      });
    });
  }

  async buscarPedido(ticket: Ticket) {
    this.pedidoService.consultarById(ticket.idPedido.toString()).subscribe( res => {
      const resultado = new Resultado(this.pedido).deserialize(res);
      this.pedido = resultado.entidades[0];
      this.apiCalled = true;
      console.log(res);

      ticket.itens.forEach(item => {
        this.arrayIds.push(item.idItem);
      });

      this.pedido.itemPedido = this.pedido.itemPedido.filter(item => {
        if (this.arrayIds.indexOf(item.id) !== -1) {
          item.quantidade = this.findItem(item.id).quantidade;
          return true;
        }
        return false;
      });
    });
  }

  findItem(id: number): ItemPedidoTiket {
    return this.ticket.itens.filter( item => {
      return item.idItem === id;
    })[0];
  }

  irParaProduto() {

  }

  async aprovarTicket(status: string) {
    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });

    loading.present();

    this.ticketService.aprovarTicket(this.ticket.id, status, this.ticket.idCliente).subscribe( res => {
      const resultado =  new Resultado(this.ticket).deserialize(res);
      loading.dismiss();
      if (resultado.mensagens.length > 0) {
        this.modalHelper.mostrarModal(this.alertController, '', '', resultado).then(modal => modal.present());
      } else {
        this.ticket = resultado.entidades[0];
      }
    }, err => {
      loading.dismiss();
      this.modalHelper.mostrarModal(this.alertController).then(modal => modal.present());
    });
  }
}
