import { Component } from '@angular/core';
import { ProdutoService } from '../produto/service/produto.service';
import { Produto } from '../produto/model/produto.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public produtos: Produto[] = new Array();
  public carregando = true;
  public min = 0;
  public max = 1000;
  public valores = [];
  public nome = '';
  public categoria = '';
  public valor = '';

  constructor(private produtoService: ProdutoService,
              private router: Router) {}

  ionViewDidEnter() {
    const self = this;
    this.produtos = new Array<Produto>();
    this.produtoService.buscarTodosProdutos().subscribe((res: any) => {
      res.entidades.forEach((el, index) => {
        self.produtos.push(new Produto().deserialize(el));
      });
      this.carregando = false;

      self.produtos.forEach((produto, index) => {
        const valor = parseInt(produto.precoVenda.replace(/\./g, '').replace(/\,/, '.'), 10);
        self.valores.push(valor);
      });

      if (self.valores.length > 0) {
        const arraySorted = self.valores.sort();
        self.max = self.valores[0];
        self.min = self.valores[self.valores.length - 1];
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

  buscar() {

  }
}
