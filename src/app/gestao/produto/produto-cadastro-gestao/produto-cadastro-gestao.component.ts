import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/produto/model/produto.model';
import { Router } from '@angular/router';
import { ProdutoService } from 'src/app/produto/service/produto.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { ModalHelper } from 'src/app/common/modal.helper';
import { Resultado } from 'src/app/common/resultado.model';

@Component({
  selector: 'app-produto-cadastro-gestao',
  templateUrl: './produto-cadastro-gestao.component.html',
  styleUrls: ['./produto-cadastro-gestao.component.scss'],
})
export class ProdutoCadastroGestaoComponent implements OnInit {

  public funcao: () => void;
  public produto = new Produto();
  constructor(private router: Router,
              private produtoService: ProdutoService,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private modalHelper: ModalHelper) {
    this.funcao = this.cadastrar.bind(this);
  }

  ngOnInit() {}

  async cadastrar() {
    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });

    loading.present();

    const json = this.produto.serialize();
    const p = this.produto.deserialize(json);
    p.precoCompra = p.precoCompra.replace(/\./g, 'l').replace(/\,/g, '.').replace(/\l/g, ',').replace('R$', '');
    p.precoVenda = p.precoVenda.replace(/\./g, 'l').replace(/\,/g, '.').replace(/\l/g, ',').replace('R$', '');

    p.ativo = true;
    this.produtoService.salvarProduto(p).subscribe(res => {
      const resultado = new Resultado(this.produto).deserialize(res);
      loading.dismiss();
      this.modalHelper.mostrarModal(this.alertController, 'Sucesso', 'Produto cadastrado com sucesso', resultado,
      () => {
        this.router.navigateByUrl('/gestao/produtos');
      }).then(modal => modal.present());
    }, err => {
      loading.dismiss();
      this.modalHelper.mostrarModal(this.alertController).then(modal => modal.present());
    });
  }

}
