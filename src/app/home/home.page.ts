import { Component } from '@angular/core';
import { ProdutoService } from '../produto/service/produto.service';
import { Produto } from '../produto/model/produto.model';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  produtos: Produto[] = new Array();
  constructor(private produtoService: ProdutoService) {}

  ionViewDidEnter() {
    const self = this;
    this.produtos = new Array<Produto>();
    this.produtoService.buscarTodosProdutos().subscribe((res: any) => {
      res.entidades.forEach((el, index) => {
        self.produtos.push(new Produto().deserialize(el));
      });
    });
  }
}
