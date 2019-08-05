import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Produto } from 'src/app/produto/model/produto.model';
import { ProdutoService } from 'src/app/produto/service/produto.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-form-produto',
  templateUrl: './form-produto.component.html',
  styleUrls: ['./form-produto.component.scss'],
})
export class FormProdutoComponent implements OnInit, AfterViewInit {

  @Input() public produto: Produto;
  @Input() public tituloBotao: string;
  @Input() public funcao: () => void;
  @Input() public cadastro: boolean;

  public categorias = new Array<string>();
  constructor(private produtoService: ProdutoService,
              private currencyPipe: CurrencyPipe) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.produtoService.buscarGategorias().subscribe(res => {
      this.categorias = res as Array<string>;
    });
  }

  convert(event, atributo = 'precoVenda') {
    if (atributo === 'precoVenda') {
      this.produto.precoVenda = this.getCurrency(this.produto.precoVenda.replace(/\,/g, '').replace('R$', ''));
    } else {
      this.produto.precoCompra = this.getCurrency(this.produto.precoCompra.replace(/\,/g, '').replace('R$', ''));
    }
  }

  getCurrency(amount: any) {
    return this.currencyPipe.transform(amount, 'BRL', true, '1.2-2');
  }
}
