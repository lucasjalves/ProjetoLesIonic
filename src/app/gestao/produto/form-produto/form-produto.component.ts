import { Component, OnInit, Input } from '@angular/core';
import { Produto } from 'src/app/produto/model/produto.model';
import { ProdutoService } from 'src/app/produto/service/produto.service';

@Component({
  selector: 'app-form-produto',
  templateUrl: './form-produto.component.html',
  styleUrls: ['./form-produto.component.scss'],
})
export class FormProdutoComponent implements OnInit {

  @Input() public produto: Produto;
  @Input() tituloBotao: string;
  @Input() funcao: () => void;
  public categorias = new Array<string>();
  constructor(private produtoService: ProdutoService) { }

  ngOnInit() {}

  ionViewDidEnter() {
    this.produtoService.buscarGategorias().subscribe(res => {
      this.categorias = res as Array<string>;
    });
  }
}
