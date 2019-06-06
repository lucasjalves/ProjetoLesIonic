import { Component, OnInit } from '@angular/core';
import { EnderecoService } from './service/endereco.service';
import { ArrayType } from '@angular/compiler';
import { Endereco } from './model/endereco.model';
import { Cliente } from '../cliente/model/cliente.model';
import { Resultado } from '../common/resultado.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.page.html',
  styleUrls: ['./endereco.page.scss'],
})
export class EnderecoListaPage implements OnInit {

  public enderecos: Array<Endereco> = new Array();
  constructor(private enderecoService: EnderecoService,
              private router: Router) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    const logged = localStorage.getItem('logged');
    const cliente: Cliente = new Cliente().deserialize(JSON.parse(logged));
    this.enderecoService.getEnderecos(cliente.cpfCnpj).subscribe( res => {
      const resultado: Resultado<Endereco> = new Resultado(new Endereco()).deserialize(res);
      this.enderecos = resultado.entidades;
    });
  }

  irParaCadastro() {
    this.router.navigateByUrl('cliente/enderecos/cadastrar');
  }
}
