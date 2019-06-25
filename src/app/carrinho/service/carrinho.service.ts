import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Carrinho } from '../model/carrinho.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ItemCarrinho } from '../model/item-carrinho.model';
import { Produto } from '../../produto/model/produto.model';
import { Resultado } from 'src/app/common/resultado.model';

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
    return this.httpClient.get(`${environment.urlBase}/rest/carrinho/adicionar/${idProduto}?qtde=${qtde}`);
  }

  async alterarQtde(produto: Produto, qtde: number) {
    const carrinho = this.getCarrinho();
    let resultado: Resultado<Produto>;
    const indiceCarrinho  = carrinho.itensCarrinho.findIndex((item, index, array) => {
      return item.produto.id === produto.id;
    });

    if (indiceCarrinho === -1) {
      const obj = await this.verificarDisponibilidadeEstoque(produto.id, qtde).toPromise();
      resultado = new Resultado(new Produto()).deserialize(obj);
      if (resultado.mensagens.length === 0) {
        const itemCarrinho = new ItemCarrinho();
        itemCarrinho.qtde = qtde;
        itemCarrinho.produto = produto;
        carrinho.itensCarrinho.push(itemCarrinho);
      }
    } else {
      const qtdeItens = carrinho.itensCarrinho[indiceCarrinho].qtde;
      if ((qtdeItens + qtde) <= 0) {
        carrinho.itensCarrinho[indiceCarrinho].qtde = 0;
        this.subject.next(carrinho);
        this.atualizarCarrinho(carrinho);
        return new Resultado(new Produto());
      }
      const obj = await this.verificarDisponibilidadeEstoque(
        carrinho.itensCarrinho[indiceCarrinho].produto.id, qtdeItens + qtde).toPromise();

      resultado = new Resultado(new Produto()).deserialize(obj);

      if (resultado.mensagens.length === 0) {
        carrinho.itensCarrinho[indiceCarrinho].qtde = qtdeItens + qtde;
      }
    }
    if (resultado.mensagens.length === 0) {
      this.subject.next(carrinho);
      this.atualizarCarrinho(carrinho);
    }
    return resultado;
  }

  getCarrinho(): Carrinho {
    const stringCarrinho = localStorage.getItem('carrinho');
    return new Carrinho().deserialize(JSON.parse(stringCarrinho));
  }


}
