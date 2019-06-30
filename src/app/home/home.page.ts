import { Component } from '@angular/core';
import { ProdutoService } from '../produto/service/produto.service';
import { Produto } from '../produto/model/produto.model';
import { Router } from '@angular/router';
import { CarrinhoService } from '../carrinho/service/carrinho.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public produtos: Produto[] = new Array();
  public todosProdutos: Produto[] = new Array();
  public carregando = true;
  public min = 0;
  public max = 1000;
  public valores = [];
  public nome = '';
  public categoria = '';
  public valor = '';

  constructor(private produtoService: ProdutoService,
              private router: Router,
              private carrinhoService: CarrinhoService,
              private toastController: ToastController) {}

  ionViewDidEnter() {
    this.produtos = new Array<Produto>();
    this.produtoService.buscarTodosProdutos().subscribe((res: any) => {
      const carrinho = this.carrinhoService.getCarrinho();
      res.entidades.forEach((el, index) => {
        const produto = new Produto().deserialize(el);
        carrinho.itensCarrinho.forEach( i => {
          if (i.produto.id === produto.id) {
            produto.qtdeCarrinho = i.qtde;
          }
        });
        this.produtos.push(produto);
      });
      this.carregando = false;
      this.todosProdutos = this.produtos;
      this.produtos.forEach((produto, index) => {
        const valor = parseInt(produto.precoVenda.replace(/\./g, '').replace(/\,/, '.'), 10);
        this.valores.push(valor);
      });

      if (this.valores.length > 0) {
        const arraySorted = this.valores.sort((a, b) => {
          return a - b;
        });
        this.min = arraySorted[0];
        this.max = arraySorted[arraySorted.length - 1];
        this.valor = this.max.toString();
      }

    });
  }

  irParaDetalhe(idProduto: string) {
    this.router.navigate(['/produto/detalhe'], {
      queryParams: {
        id: idProduto
      }
    });
  }

  async atualizarProdutos() {
      const carrinho = this.carrinhoService.getCarrinho();
      this.produtos.forEach( produto => {
        const item = carrinho.itensCarrinho.filter(i => {
          return i.produto.id === produto.id;
        });
        if (item[0] === undefined) {
          produto.qtdeCarrinho = 0;
        } else {
          produto.qtdeCarrinho = item[0].qtde;
        }
      });

      this.todosProdutos.forEach( produto => {
        const item = carrinho.itensCarrinho.filter(i => {
          return i.produto.id === produto.id;
        });
        if (item[0] === undefined) {
          produto.qtdeCarrinho = 0;
        } else {
          produto.qtdeCarrinho = item[0].qtde;
        }
      });
  }
  async alterarQtde(qtde: number, produto: Produto) {
    if (produto.qtdeCarrinho === 0 && qtde === -1) {
      return;
    }
    this.carrinhoService.alterarQtde(produto, qtde).then( resultado => {
      if (resultado.mensagens.length === 0 ) {
        this.atualizarProdutos();
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
    });
  }

  async mostrarToast(msg: string) {
    return this.toastController.create({
      message: msg,
      duration: 1000
    });
  }
  buscar() {
    this.produtos = this.todosProdutos.filter(produto => {
      if (this.nome.length > 0) {
        return this.filtrarPorCategoria(produto) && this.filtrarPorValor(produto) && this.filtrarPorNome(produto);
      } else {
        return this.filtrarPorCategoria(produto) && this.filtrarPorValor(produto);
      }
    });
  }

  filtrarPorCategoria(produto: Produto): boolean {
    if (this.categoria.length !== 0) {
      return produto.categoria === this.categoria;
    }
    return true;
  }

  filtrarPorValor(produto: Produto): boolean {
    const valor = parseInt(this.valor, 10);
    const valorProduto =  parseInt(produto.precoVenda.replace(/\./g, '').replace(/\,/, '.'), 10);
    return valorProduto <= valor;
  }

  filtrarPorNome(produto: Produto) {
    return produto.modelo.toLowerCase().includes(this.nome.toLowerCase()) || produto.marca.toLowerCase().includes(this.nome.toLowerCase());
  }
}
