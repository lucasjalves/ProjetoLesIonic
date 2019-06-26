import { Component } from '@angular/core';
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

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})

export class CarrinhoPage {


  public produtos: Produto[] = new Array();
  public carregando = true;
  public carrinho: Carrinho;
  public total: string;
  public codigoCupom: string;
  constructor(private produtoService: ProdutoService,
              private router: Router,
              private carrinhoService: CarrinhoService,
              private toastController: ToastController,
              private cupomService: CupomService,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private modalHelper: ModalHelper) {}

  ionViewDidEnter() {
    this.carrinho = this.filtarCarrinho(this.carrinhoService.getCarrinho());
    this.carregando = false;
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
      console.log(err);
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
    carrinho.itensCarrinho.forEach(item => {
      const valorItem = parseInt(item.produto.precoVenda.replace(/\./g, '').replace(/\,/g, '.'), 10) * item.qtde;
      tot = tot + valorItem;
    });
    this.total = this.formatMoney(tot, ',' , '.');
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

    });
  }
}
