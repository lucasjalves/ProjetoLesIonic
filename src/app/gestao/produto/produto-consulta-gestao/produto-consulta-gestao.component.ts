import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/produto/model/produto.model';
import { ProdutoService } from 'src/app/produto/service/produto.service';
import { Router } from '@angular/router';
import { Resultado } from 'src/app/common/resultado.model';

@Component({
  selector: 'app-produto-consulta-gestao',
  templateUrl: './produto-consulta-gestao.component.html',
  styleUrls: ['./produto-consulta-gestao.component.scss'],
})
export class ProdutoConsultaGestaoComponent implements OnInit {

  public strings = {
    true: 'Ativo',
    fase: 'Inativo'
  };
  public apiCalled = false;
  public produtos = new Array<Produto>();
  constructor(private produtoService: ProdutoService,
              private router: Router) { }

  ngOnInit() {}

  ionViewDidEnter() {
    this.produtoService.buscarTodosProdutos(true).subscribe(res => {
      const ents = res as any;
      for (const obj of ents.entidades) {
        this.produtos.push(new Produto().deserialize(obj));
      }
      this.apiCalled = true;
    });
  }

  irParaCadastro() {
    this.router.navigateByUrl('/gestao/produtos/cadastro');
  }
}
