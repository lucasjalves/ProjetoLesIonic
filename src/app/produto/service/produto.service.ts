import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Produto } from '../model/produto.model';
@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private httpClient: HttpClient) { }

  public buscarTodosProdutos(admin = false) {
    return this.httpClient.get(`${environment.urlBase}/rest/produto/consulta/todos?admin=${admin}`);
  }

  public buscarPorId(id: string) {
    return this.httpClient.get(`${environment.urlBase}/rest/produto/consulta/${id}`);
  }

  public buscarGategorias() {
    return this.httpClient.get(`${environment.urlBase}/rest/produto/categorias`);
  }

  public salvarProduto(produto: Produto) {
    return this.httpClient.post(`${environment.urlBase}/rest/produto/salvar`, produto);
  }
}
