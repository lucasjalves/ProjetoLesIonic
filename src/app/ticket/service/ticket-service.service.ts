import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Ticket } from '../model/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private httpClient: HttpClient) { }

  consultarTodosTicketsCliente(cpf: string) {
    return this.httpClient.get(`${environment.urlBase}/rest/ticket/cliente/${cpf}`);
  }

  gerarTicket(ticket: Ticket) {
    return this.httpClient.post(`${environment.urlBase}/rest/ticket/efetivar`, ticket);
  }

  buscarPorId(id: any) {
    return this.httpClient.get(`${environment.urlBase}/rest/ticket/get/${id}`);
  }

  consultarTodos() {
    return this.httpClient.get(`${environment.urlBase}/rest/ticket/todos`);
  }
}
