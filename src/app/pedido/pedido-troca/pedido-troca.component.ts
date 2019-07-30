import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PedidoService } from '../service/pedido.service';
import { Pedido } from '../model/pedido.model';
import { Resultado } from '../../common/resultado.model';
import { Ticket } from '../../ticket/model/ticket.model';
import { ItemPedidoTiket } from 'src/app/ticket/model/item-pedido-ticket.model';
import { LoadingController, AlertController } from '@ionic/angular';
import { ModalHelper } from 'src/app/common/modal.helper';
import { TicketService } from 'src/app/ticket/service/ticket-service.service';

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
  public devolucao = true;
  constructor(private router: Router,
              private pedidoService: PedidoService,
              private activatedRoute: ActivatedRoute,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private modalHelper: ModalHelper,
              private ticketService: TicketService) { }

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
      this.ticket.itens[index].idItem = this.pedido.itemPedido[index].id;
    });

    this.ticket.idPedido = this.pedido.id;
    this.ticket.idCliente = this.pedido.idCliente;
    this.ticket.tipo = 'DEVOLUCAO';
  }

  async efetivarTroca() {
    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });

    loading.present();

    this.ticketService.gerarTicket(this.ticket).subscribe( res => {
      loading.dismiss();
      const resultado = new Resultado(new Ticket()).deserialize(res);
      if (resultado.mensagens.length > 0) {
        this.modalHelper.mostrarModal(this.alertController, '', '', resultado).then(modal => modal.present());
      } else {
        const ticket = resultado.entidades[0];
        this.router.navigate(['/ticket/efetivar'], {
          queryParams: {
            id: ticket.id
          }
        });
      }
    }, err => {
      loading.dismiss();
      this.modalHelper.mostrarModal(this.alertController).then( modal => modal.present());
    });
  }

  verificarFormValido() {
    let qtde = 0;
    this.ticket.itens.forEach( item => {
      if (item.quantidade !== null) {
        qtde = parseInt(qtde.toString(), 10) + parseInt(item.quantidade === undefined ? '0' : item.quantidade.toString(), 10);
      }

    });
    this.isInvalid = (qtde === 0);
  }

  alterarTipoTicket(tipo: string) {
    this.ticket.tipo = tipo;
  }
}
