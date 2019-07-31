import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../service/pedido.service';
import { ClienteService } from 'src/app/cliente/service/cliente.service';
import { Pedido } from '../model/pedido.model';
import { Resultado } from 'src/app/common/resultado.model';
import { Cliente } from 'src/app/cliente/model/cliente.model';
import { CartaoPedido } from '../model/cartao-pedido.model';
import { LoadingController, AlertController } from '@ionic/angular';
import { ModalHelper } from 'src/app/common/modal.helper';

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
  public cartoesSelecionados: Array<number> = new Array();
  public apiCalled = false;
  public pedido = new Pedido();
  public cliente: Cliente = new Cliente();
  public admin = false;
  public idPedido = 0;
  constructor(private activedRoute: ActivatedRoute,
              private pedidoService: PedidoService,
              private clienteService: ClienteService,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private modalHelper: ModalHelper,
              private router: Router) { }

  ngOnInit() {}

  ionViewDidEnter() {
    this.activedRoute.queryParams.subscribe( params => {
      this.idPedido  = params.id as number;
      this.admin = params.admin as boolean;
      this.pedidoService.consultarById(params.id).subscribe(res => {
        const resultado = new Resultado<Pedido>(new Pedido()).deserialize(res);
        this.pedido = resultado.entidades[0];
        const c = JSON.parse(localStorage.getItem('logged'));
        const cli = new Cliente().deserialize(c);
        this.clienteService.getById(this.pedido.idCliente).subscribe(response => {
          const result = new Resultado<Cliente>(new Cliente()).deserialize(response);
          this.cliente = result.entidades[0];
          this.apiCalled = true;
        });
      });
    });
  }

  async finalizarPedido() {
    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });

    loading.present();
    const cartoes = new Array<any>();
    this.cartoesSelecionados.forEach( cartao => {
      const valorPagamento = this.pedido.totalCompra.replace(/[.]/g, '').replace(/[,]/g, '.');
      const valorFloat = parseFloat( (parseInt(valorPagamento, 10) / this.cartoesSelecionados.length).toString() );
      const valorFormatado = valorFloat.toFixed(2).replace(/[.]/g, ',');
      cartoes.push({
        idCartao: cartao,
        valor: valorFormatado
      });
    });

    this.pedidoService.efetivarPedido(this.pedido.id, cartoes).subscribe( res => {
      loading.dismiss();
      const resultado = new Resultado(new Pedido()).deserialize(res);
      if ( resultado.mensagens.length > 0 ) {
        this.modalHelper.mostrarModal(this.alertController, 'Erro', '', resultado).then( modal => {
          modal.present();
        });
      } else {
        this.router.navigate(['/pedido/efetivar'], {
          queryParams: {
            id: this.pedido.id
          }
        });
      }
    }, err => {
      loading.dismiss();
      this.modalHelper.mostrarModal(this.alertController, 'Erro', 'Sistema temporiamente indisponível. Tente novamente mais tarde')
      .catch( modal => {
        modal.present();
      });
    });

  }

  async cancelar() {
    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });

    loading.present();

    this.pedidoService.cancelar(this.pedido.id, this.pedido.idCliente).subscribe( res => {
      const resultado = new Resultado(new Pedido()).deserialize(res);
      loading.dismiss();
      if (resultado.mensagens.length > 0) {
        this.modalHelper.mostrarModal(this.alertController, 'Erro', '', resultado).then( modal => {
          modal.present();
        });
      } else {
        this.pedido.status = 'CANCELADO';
        this.modalHelper.mostrarModal(this.alertController, 'Sucesso', 'Pedido cancelado. '
         + 'O crédito será adicionado na sua conta').then(modal => {
           modal.present();
         });
      }
    }, err => {
      loading.dismiss();
      this.modalHelper.mostrarModal(this.alertController, 'Erro', 'Sistema temporariamente indisponível. Tente novamente mais tarde')
      .then(modal => {
        modal.present();
      });
    });
  }
  trocar() {
    this.router.navigate(['/pedido/trocar'], {
      queryParams: {
        id: this.pedido.id
      }
    });
  }

  async enviar() {
    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });

    loading.present();
    this.pedidoService.atualizarStatusPara('ENTREGUE', this.idPedido).subscribe(res => {
      const resultado = new Resultado(this.pedido).deserialize(res);
      this.pedido = resultado.entidades[0];
      loading.dismiss();
      if (resultado.mensagens.length > 0) {
        this.modalHelper.mostrarModal(this.alertController, '', '', resultado).then(modal => modal.present());
      }
    }, err => {
      loading.dismiss();
      this.modalHelper.mostrarModal(this.alertController).then(modal => modal.present());
    });
  }
}
