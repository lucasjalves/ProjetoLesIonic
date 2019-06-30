import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private httpClient: HttpClient) { }

  consultarPedidosPorCliente(cpf: string) {
    return this.httpClient.get(`${environment.urlBase}/rest/pedido/getByClient/${cpf}`);
  }
}
