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
    });
  }

  irParaDetalhe(idProduto: string) {
    this.router.navigate(['/produto/detalhe'], {
      queryParams: {
        id: idProduto
      }
    });
  }
}
