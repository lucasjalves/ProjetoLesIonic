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
}
