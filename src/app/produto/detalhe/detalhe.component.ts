import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd } from '@angular/router';
import { ProdutoService } from '../service/produto.service';
import { Produto } from '../model/produto.model';
import { Resultado } from '../../common/resultado.model';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.scss'],
})
export class ProdutoDetalheComponent implements OnInit {

  public produto = new Produto();
  private id: string;
  constructor(private activatedRoute: ActivatedRoute,
              private produtoService: ProdutoService) { }

  ngOnInit() {}

  ionViewDidEnter() {
    this.activatedRoute.queryParams.subscribe( params => {
      console.log(params);
      this.produtoService.buscarPorId(params.id).subscribe( res => {
        const resultado =  new Resultado(this.produto).deserialize(res);
        this.produto = resultado.entidades[0];
      });
    });
  }
}
