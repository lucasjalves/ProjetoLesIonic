import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../model/cliente.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private httpClient: HttpClient) { }

  cadastrar(cliente: Cliente) {
    return this.httpClient.post(`${environment.urlBase}/rest/cliente/cadastrar`, cliente.serialize());
  }

  login(cliente: Cliente) {
    return this.httpClient.post(`${environment.urlBase}/rest/cliente/login`, cliente.serialize());
  }

  getInfo(cpf: string) {
    return this.httpClient.get(`${environment.urlBase}/rest/cliente/get/${cpf}`);
  }

  alterar(cliente: Cliente) {
    return this.httpClient.put(`${environment.urlBase}/rest/cliente/alterar`, cliente);
  }

  getById(id: any) {
    return this.httpClient.get(`${environment.urlBase}/rest/cliente/getById/${id}`);
  }

  getClienteLogado(): Cliente {
    const stringCliente = localStorage.getItem('logged');
    const jsonCliente = JSON.parse(stringCliente);
    return new Cliente().deserialize(jsonCliente);
  }
}
