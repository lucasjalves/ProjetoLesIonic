import { Component, OnInit } from '@angular/core';
import { TicketService } from './service/ticket-service.service';
import { Ticket } from './model/ticket.model';
import { Cliente } from '../cliente/model/cliente.model';
import { ClienteService } from '../cliente/service/cliente.service';
import { Resultado } from '../common/resultado.model';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})
export class TicketClienteComponent implements OnInit {

  public tickets = new Array<Ticket>();
  public cliente: Cliente = new Cliente();
  public apiCalled = false;
  constructor(private ticketService: TicketService,
              private clienteService: ClienteService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.cliente = this.clienteService.getClienteLogado();
    this.ticketService.consultarTodosTicketsCliente(this.cliente.cpfCnpj).subscribe( res => {
      this.apiCalled = true;
      const resultado = new Resultado(new Ticket()).deserialize(res);
      this.tickets = resultado.entidades;
    });
  }
}
