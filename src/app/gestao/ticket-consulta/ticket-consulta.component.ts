import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/ticket/model/ticket.model';
import { Cliente } from 'src/app/cliente/model/cliente.model';
import { TicketService } from 'src/app/ticket/service/ticket-service.service';
import { ClienteService } from 'src/app/cliente/service/cliente.service';
import { Resultado } from 'src/app/common/resultado.model';


@Component({
  selector: 'app-ticket-consulta',
  templateUrl: './ticket-consulta.component.html',
  styleUrls: ['./ticket-consulta.component.scss'],
})
export class TicketConsultaGestaoComponent implements OnInit {

  public tickets = new Array<Ticket>();
  public cliente: Cliente = new Cliente();
  public apiCalled = false;
  constructor(private ticketService: TicketService,
              private clienteService: ClienteService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.cliente = this.clienteService.getClienteLogado();
    this.ticketService.consultarTodos().subscribe( res => {
      this.apiCalled = true;
      const resultado = new Resultado(new Ticket()).deserialize(res);
      this.tickets = resultado.entidades;
    });
  }

}
