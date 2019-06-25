import { Component } from '@angular/core';
import { ProdutoService } from '../produto/service/produto.service';
import { Produto } from '../produto/model/produto.model';
import { Router } from '@angular/router';
import { CarrinhoService } from '../carrinho/service/carrinho.service';
import { ToastController } from '@ionic/angular';
import { Carrinho } from './model/carrinho.model';

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
  constructor(private produtoService: ProdutoService,
              private router: Router,
              private carrinhoService: CarrinhoService,
              private toastController: ToastController) {}

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
      const s = n < 0 ? '-' : '',
      i = parseInt(n = Math.abs(Number(n) || 0).toFixed(c), 10).toString();
      let j = (j = i.length) > 3 ? j % 3 : 0;
     return s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
  }

}
