import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/produto/model/produto.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produto-cadastro-gestao',
  templateUrl: './produto-cadastro-gestao.component.html',
  styleUrls: ['./produto-cadastro-gestao.component.scss'],
})
export class ProdutoCadastroGestaoComponent implements OnInit {

  public funcao: () => void;
  public produto = new Produto();
  constructor(private router: Router) {
    this.funcao = this.cadastrar.bind(this);
  }

  ngOnInit() {}

  cadastrar() {

  }

}
