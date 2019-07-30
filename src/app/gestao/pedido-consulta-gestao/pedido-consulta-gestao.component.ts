import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/pedido/service/pedido.service';
import { Pedido } from 'src/app/pedido/model/pedido.model';
import { Resultado } from 'src/app/common/resultado.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido-consulta-gestao',
  templateUrl: './pedido-consulta-gestao.component.html',
  styleUrls: ['./pedido-consulta-gestao.component.scss'],
})
export class PedidoConsultaGestaoComponent implements OnInit {

  public apiCalled = false;
  public pedidos = new Array<Pedido>();
  constructor(private pedidoService: PedidoService,
              private router: Router) { }

  ngOnInit() {}

  ionViewDidEnter() {
    this.pedidoService.consultarTodos().subscribe(res => {
      const resultado = new Resultado(new Pedido()).deserialize(res);
      this.pedidos = resultado.entidades;
    });
  }

  irParaDetalhe(idPedido: number) {
    this.router.navigate(['/pedido/detalhe'], {
      queryParams: {
        id: idPedido,
        admin: true
      }
    });
  }
}
