import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { ProdutoService } from '../service/produto.service';
import { Produto } from '../model/produto.model';
import { Resultado } from '../../common/resultado.model';
import { CarrinhoService } from '../../carrinho/service/carrinho.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ModalHelper } from '../../common/modal.helper';
import { Carrinho } from '../../carrinho/model/carrinho.model';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.scss'],
})
export class ProdutoDetalheComponent implements OnInit {

  public produto = new Produto();
  public loaded = false;
  private id: string;
  constructor(private activatedRoute: ActivatedRoute,
              private produtoService: ProdutoService,
              private carrinhoService: CarrinhoService,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private toastController: ToastController,
              private modalHelper: ModalHelper) { }

  ngOnInit() {}

  ionViewDidEnter() {
    this.loaded = false;
    this.activatedRoute.queryParams.subscribe( params => {
      this.produtoService.buscarPorId(params.id).subscribe( res => {
        const resultado =  new Resultado(this.produto).deserialize(res);
        this.produto = resultado.entidades[0];
        this.loaded = true;
      });
    });
  }

  async adicionarNoCarrinho(id) {
    const loading = await this.loadingController.create({
        message: 'Carregando...'
    });

    const toast = await this.toastController.create({
      message: 'Produto adicionado no carrinho',
      duration: 2000
    });
    loading.present();
    this.carrinhoService.verificarDisponibilidadeEstoque(this.produto.id, 1).subscribe( res => {
      const resultado = new Resultado(new Produto()).deserialize(res);
      loading.dismiss();
      if (resultado.mensagens.length === 0) {
        this.carrinhoService.adicionarItemCarrinho(this.produto, 1);
        toast.present();
      } else {
        this.modalHelper.mostrarModal(this.alertController, 'Erro', '', resultado).then(modal => {
          modal.present();
        });
      }
    }, err => {
      loading.dismiss();
      this.modalHelper.mostrarModal(this.alertController, 'Falha', 'Sistema temporariamente indisponível. Tente novamente mais tarde.')
      .then(modal => {
        modal.present();
      });
    });
  }

}
