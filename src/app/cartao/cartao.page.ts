import { Component, OnInit } from '@angular/core';
import { CartaoService } from './service/cartao.service';
import { Cartao } from './model/cartao.model';
import { Resultado } from '../common/resultado.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cartao',
  templateUrl: './cartao.page.html',
  styleUrls: ['./cartao.page.scss'],
})
export class CartaoListaPage implements OnInit {

  public cartoes: Array<Cartao> = new Array();
  constructor(private cartaoService: CartaoService,
              private router: Router) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.cartaoService.getCartoes().subscribe( res => {
      const resultado = new Resultado(new Cartao()).deserialize(res);
      this.cartoes = resultado.entidades as Array<Cartao>;
    });
  }

  irParaCadastro() {
    this.router.navigateByUrl('/cliente/cartoes/cadastro');
  }
}
