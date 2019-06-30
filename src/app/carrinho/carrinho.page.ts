import { Component, ɵConsole } from '@angular/core';
import { ProdutoService } from '../produto/service/produto.service';
import { Produto } from '../produto/model/produto.model';
import { Router } from '@angular/router';
import { CarrinhoService } from '../carrinho/service/carrinho.service';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Carrinho } from './model/carrinho.model';
import { CupomService } from '../cupom/cupom.service';
import { Cupom } from '../cupom/cupom.model';
import { Resultado } from '../common/resultado.model';
import { ModalHelper } from '../common/modal.helper';
import { environment } from 'src/environments/environment';
import { Cliente } from '../cliente/model/cliente.model';
import { ClienteService } from '../cliente/service/cliente.service';
import { PedidoService } from '../pedido/service/pedido.service';
import { Pedido } from '../pedido/model/pedido.model';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})

export class CarrinhoPage {


  public produtos: Produto[] = new Array();
  public carregando = true;
  public carrinho: Carrinho = new Carrinho();
  public total: string;
  public totalItens: string;
  public codigoCupom: string;
  public desconto: string;
  public frete;
  public cliente: Cliente;
  public idEndereco = '-1';
  constructor(private produtoService: ProdutoService,
              private router: Router,
              private carrinhoService: CarrinhoService,
              private toastController: ToastController,
              private cupomService: CupomService,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private modalHelper: ModalHelper,
              private clienteService: ClienteService,
              private pedidoService: PedidoService) {}

  ionViewDidEnter() {
    this.carrinho = this.filtarCarrinho(this.carrinhoService.getCarrinho());
    this.carregando = false;
    const logado = localStorage.getItem('logged');
    const c = new Cliente().deserialize(JSON.parse(logado));
    this.clienteService.getInfo(c.cpfCnpj).subscribe( res => {
      const resultado = new Resultado(new Cliente()).deserialize(res);
      this.cliente = resultado.entidades[0];
    });
  }

  irParaDetalhe(idProduto: string) {
    this.router.navigate(['/produto/detalhe'], {
      queryParams: {
        id: idProduto
      }
    });
  }
  async alterarQtde(qtde: number, produto: Produto) {
    this.carrinhoService.alterarQtde(produto, qtde).then( resultado => {
      if (resultado.mensagens.length === 0 ) {

        this.mostrarToast('Item adicionado ao carrinho').then(toast => {
          toast.present();
        });
      } else {
        this.mostrarToast(resultado.mensagens[0]).then( toast => {
          toast.present();
        });
      }
    })
    .catch( err => {
      this.mostrarToast('Erro ao adicionar o item no carrinho. Tente novamente mais tarde').then( toast => {
        toast.present();
      });
    })
    .finally(() => {
      this.carrinho = this.filtarCarrinho(this.carrinhoService.getCarrinho());
    });
  }

  filtarCarrinho(carrinho: Carrinho): Carrinho {
    carrinho.itensCarrinho = carrinho.itensCarrinho.filter(item => {
      return item.qtde !== 0;
    });
    this.atualizarTotal(carrinho);
    return carrinho;
  }
  async mostrarToast(msg: string) {
    return this.toastController.create({
      message: msg,
      duration: 1000
    });
  }

  atualizarTotal(carrinho: Carrinho) {
    let tot = 0;
    let frete = 0;
    let totItens = 0;
    let desconto = 0;

    carrinho.itensCarrinho.forEach(item => {
      const valorItem = parseInt(item.produto.precoVenda.replace(/\./g, '').replace(/\,/g, '.'), 10) * item.qtde;
      tot = tot + valorItem;
      totItens = tot;
      const peso = parseInt(item.produto.peso, 10) / environment.taxa_divisao;
      const altura = parseInt(item.produto.altura, 10 ) / environment.taxa_divisao;
      const comprimento = parseInt(item.produto.comprimento, 10) / environment.taxa_divisao;
      const largura = parseInt(item.produto.largura, 10) / environment.taxa_divisao;

      frete = ((peso + altura + comprimento + largura) * item.qtde) + environment.taxa_fixa_frete;
    });
    if (carrinho.cupom.codigo !== undefined && carrinho.cupom.codigo !== null) {
      desconto = (tot * (carrinho.cupom.valorDesconto / 100));
      tot = tot - desconto;
    }
    tot = tot + frete;
    this.frete = this.formatMoney(frete, ',', '.');
    this.total = this.formatMoney(tot, ',' , '.');
    this.totalItens = this.formatMoney(totItens, ',', '.');
    this.desconto = this.formatMoney(desconto, ',' , '.');

  }

  formatMoney(n, c?, d?, t?) {
      c = isNaN(c = Math.abs(c)) ? 2 : c;
      d = d === undefined ? '.' : d;
      t = t === undefined ? ',' : t;
      const s = n < 0 ? '-' : '';
      const i: any = parseInt(n = Math.abs(Number(n) || 0).toFixed(c), 10).toString();
      const j = i.length > 3 ? i.length % 3 : 0;
      return s + (j ? i.substr(0, j) + t : '') + i.substr(j)
      .replace(/(\d{3})(?=\d)/g, '$1' + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
  }

  async adicionarCupom() {
    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });
    loading.present();
    this.cupomService.consultar(this.codigoCupom).subscribe( (res: any) => {
      loading.dismiss();
      const resultado = new Resultado<Cupom>(new Cupom()).deserialize(res);
      if (resultado.mensagens.length > 0) {
        this.modalHelper.mostrarModal(this.alertController, 'Erro', 'Sistema indisponível', resultado)
        .then(modal => {
          modal.present();
        });
      } else {
        const carrinho = this.carrinhoService.getCarrinho();
        carrinho.cupom = resultado.entidades[0];
        this.carrinho.cupom =  resultado.entidades[0];
        this.carrinhoService.atualizarCarrinho(carrinho);
        this.carrinho.itensCarrinho = this.carrinho.itensCarrinho.filter(item => {
          return item.qtde > 0;
        });
        this.atualizarTotal(carrinho);
      }
    }, err => {
      this.modalHelper.mostrarModal(this.alertController, 'Erro', 'Sistema temporariamente indisónível. Tenta novamente mais tarde')
      .then( modal => {
        modal.present();
      });
    });
  }

  removerCupom() {
    this.carrinho.cupom = new Cupom();
    this.carrinhoService.atualizarCarrinho(this.carrinho);
    this.atualizarTotal(this.carrinho);
  }

  login() {
    this.router.navigateByUrl('cliente/login');
  }

  async comprar() {
    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });
    loading.present();

    const endereco = this.cliente.enderecos.filter(e => {
      return parseInt(e.id, 10) === parseInt(this.idEndereco, 10);
    })[0];
    this.carrinho.endereco = endereco;
    this.pedidoService.confirmarPedido(this.carrinho, this.cliente.cpfCnpj).subscribe(res => {
      loading.dismiss();
      const resultado = new Resultado<Pedido>(new Pedido()).deserialize(res);
      if (resultado.mensagens.length > 0) {
        this.modalHelper.mostrarModal(this.alertController, 'Erro', 'Sistema Indisponível. Tente novamente mais tarde', resultado)
        .then(modal => {
          modal.present();
        });
      } else {
        this.carrinhoService.atualizarCarrinho(new Carrinho());
        this.carrinho = new Carrinho();
        this.router.navigate(['pedido/detalhe'], {
          queryParams: {
            id: resultado.entidades[0].id
          }
        });
      }
    }, err => {
      this.modalHelper.mostrarModal(this.alertController, 'Erro', 'Sistema indisponível. Tente novamente mais tarde')
      .then(modal => {
        modal.present();
      });
    });
  }
}
