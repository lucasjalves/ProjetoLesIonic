import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PedidoService } from '../service/pedido.service';
import { Pedido } from '../model/pedido.model';
import { Resultado } from '../../common/resultado.model';

@Component({
  selector: 'app-pedido-troca',
  templateUrl: './pedido-troca.component.html',
  styleUrls: ['./pedido-troca.component.scss'],
})
export class PedidoTrocaComponent implements OnInit {

  public apiCalled = false;
  public pedido =  new Pedido();
  constructor(private router: Router,
              private pedidoService: PedidoService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {}

  ionViewDidEnter() {
    this.activatedRoute.queryParams.subscribe( param => {
      this.pedidoService.consultarById(param.id).subscribe( res =>  {
        this.apiCalled = true;
        const resultado =  new Resultado(new Pedido()).deserialize(res);
        this.pedido = resultado.entidades[0];
      });
    });
  }
}
