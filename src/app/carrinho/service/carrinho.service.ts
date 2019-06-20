import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Carrinho } from '../model/carrinho.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ItemCarrinho } from '../model/item-carrinho.model';
import { Produto } from '../../produto/model/produto.model';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  public subject: Subject<Carrinho> = new Subject();
  constructor(private httpClient: HttpClient) {
    if  (localStorage.getItem('carrinho') == null) {
      this.atualizarCarrinho();
    }
   }

   atualizarCarrinho(carrinho = new Carrinho()) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    this.subject.next(this.getCarrinho());
  }

  verificarDisponibilidadeEstoque(idProduto: string, qtde: number) {
    let qtdeCarrinho = 0;
    const indiceCarrinho  = this.getCarrinho().itensCarrinho.findIndex((item, index, array) => {
      return item.produto.id === idProduto;
    });
    if (indiceCarrinho !== -1) {
      qtdeCarrinho = this.getCarrinho().itensCarrinho[indiceCarrinho].qtde;
    }
    return this.httpClient.get(`${environment.urlBase}/rest/carrinho/adicionar/${idProduto}?qtde=${qtde + qtdeCarrinho}`);
  }

  adicionarItemCarrinho(produto: Produto, qtde: number) {
    const carrinho = this.getCarrinho();
    const indiceCarrinho  = carrinho.itensCarrinho.findIndex((item, index, array) => {
      return item.produto.id === produto.id;
    });

    if (indiceCarrinho === -1) {
      const itemCarrinho = new ItemCarrinho();
      itemCarrinho.qtde = qtde;
      itemCarrinho.produto = produto;
      carrinho.itensCarrinho.push(itemCarrinho);
    } else {
      const qtdeItens = carrinho.itensCarrinho[indiceCarrinho].qtde;
      carrinho.itensCarrinho[indiceCarrinho].qtde = qtdeItens + qtde;
    }
    this.subject.next(carrinho);
    this.atualizarCarrinho(carrinho);
  }

  getCarrinho(): Carrinho {
    const stringCarrinho = localStorage.getItem('carrinho');
    return new Carrinho().deserialize(JSON.parse(stringCarrinho));
  }


}
