import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from '../model/pedido.model';
import { PedidoService } from '../service/pedido.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Resultado } from 'src/app/common/resultado.model';

@Component({
  selector: 'app-pedido-efetivacao',
  templateUrl: './pedido-efetivacao.component.html',
  styleUrls: ['./pedido-efetivacao.component.scss'],
})
export class PedidoEfetivacaoComponent implements OnInit {

  public pedido = new Pedido();
  public apiCalled = false;
  constructor(private activeRoute: ActivatedRoute,
              private pedidoService: PedidoService,
              private router: Router) { }

  ngOnInit() {}

  ionViewDidEnter() {
    this.activeRoute.queryParams.subscribe( param => {
      this.apiCalled = true;
      this.pedidoService.consultarById(param.id).subscribe( res => {
        const resultado = new Resultado(new Pedido()).deserialize(res);
        this.pedido = resultado.entidades[0];
      });
    });
  }

  irParaDetalhe() {
    this.router.navigate(['/pedido/detalhe'], {
      queryParams : {
        id: this.pedido.id
      }
    });
  }
}
