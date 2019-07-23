import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private httpClient: HttpClient) { }

  consultarTodosTicketsCliente(cpf: string) {
    return this.httpClient.get(`${environment.urlBase}/rest/ticket/cliente/${cpf}`);
  }
}
