import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Carrinho } from 'src/app/carrinho/model/carrinho.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private httpClient: HttpClient) { }

  consultarPedidosPorCliente(cpf: string) {
    return this.httpClient.get(`${environment.urlBase}/rest/pedido/getByClient/${cpf}`);
  }

  confirmarPedido(carrinho: Carrinho, cpf: string) {
    return this.httpClient.post(`${environment.urlBase}/rest/pedido/cadastrar/${cpf}`, carrinho.serialize());
  }

  consultarById(id: string) {
    return this.httpClient.get(`${environment.urlBase}/rest/pedido/get/${id}`);
  }

  efetivarPedido(id: number, cartoes: any) {
    return this.httpClient.post(`${environment.urlBase}/rest/pedido/efetivar/${id}`, cartoes);
  }

  cancelar(idPedido: number, idCliente: number) {
    return this.httpClient.get(`${environment.urlBase}/rest/pedido/cancelar/${idPedido}?idCliente=${idCliente}`);
  }

  trocar(idPedido: number, idCliente: number) {
    return this.httpClient.get(`${environment.urlBase}/rest/pedido/trocar/${idPedido}?idCliente=${idCliente}`);
  }

  atualizarStatusPara(status: string, id: number) {
    return this.httpClient.patch(`${environment.urlBase}/rest/pedido/update/status/${id}?status=${status}`, {});
  }

  consultarTodos() {
    return this.httpClient.get(`${environment.urlBase}/rest/pedido/todos`);
  }
}
