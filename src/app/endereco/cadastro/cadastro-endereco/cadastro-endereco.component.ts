import { Component, OnInit } from '@angular/core';
import { Endereco } from '../../model/endereco.model';

@Component({
  selector: 'app-cadastro-endereco',
  templateUrl: './cadastro-endereco.component.html',
  styleUrls: ['./cadastro-endereco.component.scss'],
})
export class CadastroEnderecoComponent implements OnInit {

  public endereco: Endereco = new Endereco();
  public funcao: () => void;
  public tituloBotao = 'Cadastrar';
  constructor() {
    this.funcao = this.cadastrar.bind(this);
  }

  ngOnInit() {}

  async cadastrar() {

  }
}
