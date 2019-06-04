import { Component, OnInit } from '@angular/core';
import { CartaoService } from './service/cartao.service';
import { Cartao } from './model/cartao.model';
import { Resultado } from '../common/resultado.model';
import { Router } from '@angular/router';
import { Cliente } from '../cliente/model/cliente.model';

@Component({
  selector: 'app-cartao',
  templateUrl: './cartao.page.html',
  styleUrls: ['./cartao.page.scss'],
})
export class CartaoListaPage implements OnInit {

  public cartoes: Array<Cartao> = new Array();
  private cliente: Cliente;
  constructor(private cartaoService: CartaoService,
              private router: Router) {

                const userString = localStorage.getItem('logged');
                this.cliente = new Cliente().deserialize(JSON.parse(userString));
              }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.cartaoService.getCartoes(this.cliente.cpfCnpj).subscribe( res => {
      const resultado = new Resultado(new Cartao()).deserialize(res);
      this.cartoes = resultado.entidades as Array<Cartao>;
    });
  }

  irParaCadastro() {
    this.router.navigateByUrl('/cliente/cartoes/cadastro');
  }

  alterar(cartao: Cartao) {
    this.router.navigate([`/cliente/cartoes/alterar`], {
      queryParams: {
        id: cartao.id,
        cpf: this.cliente.cpfCnpj
      }
    });
  }
}
