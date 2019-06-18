import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private httpClient: HttpClient) { }

  public buscarTodosProdutos() {
    return this.httpClient.get(environment.urlBase + '/rest/produto/consulta/todos');
  }

  public buscarPorId(id: string) {
    console.log(id);
    return this.httpClient.get(`${environment.urlBase}/rest/produto/consulta/${id}`);
  }
}
