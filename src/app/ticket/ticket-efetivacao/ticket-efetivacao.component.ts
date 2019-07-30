import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../service/ticket-service.service';
import { Ticket } from '../model/ticket.model';
import { Resultado } from 'src/app/common/resultado.model';

@Component({
  selector: 'app-ticket-efetivacao',
  templateUrl: './ticket-efetivacao.component.html',
  styleUrls: ['./ticket-efetivacao.component.scss'],
})
export class TicketEfetivacaoComponent implements OnInit {

  public ticket = new Ticket();
  public apiCalled = false;
  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private ticketService: TicketService) { }

  ngOnInit() {}

  ionViewDidEnter() {
    this.activeRoute.queryParams.subscribe(params => {
      this.ticketService.buscarPorId(params.id).subscribe( res => {
        this.apiCalled = true;
        const resultado = new Resultado(new Ticket()).deserialize(res);
        this.ticket = resultado.entidades[0];
      });
    });
  }

  irParaDetalhe() {
    this.router.navigate(['ticket/detalhe'], {
      queryParams: {
        id: this.ticket.id
      }
    });
  }
}
