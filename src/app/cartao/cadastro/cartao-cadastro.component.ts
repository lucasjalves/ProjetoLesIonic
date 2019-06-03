import { Component, OnInit } from '@angular/core';
import { Cartao } from '../model/cartao.model';
import { AlertController, LoadingController } from '@ionic/angular';
import { CartaoService } from '../service/cartao.service';
import { ModalHelper } from '../../common/modal.helper';
import { Resultado } from '../../common/resultado.model';

@Component({
  selector: 'app-cartao-cadastro',
  templateUrl: './cartao-cadastro.component.html',
  styleUrls: ['./cartao-cadastro.component.scss'],
})
export class CartaoCadastroComponent implements OnInit {

  private cartao: Cartao = new Cartao();

  constructor(private alertController: AlertController,
              private loadingController: LoadingController,
              private cartaoService: CartaoService,
              private modalHelper: ModalHelper) { }

  ngOnInit() {}

  ionViewDidEnter() {
    this.cartao = new Cartao();
  }

  async cadastrar() {
    this.cartao.dtFormatado =  new Date(this.cartao.dtVencimento).toLocaleDateString();
    const carregando = await this.loadingController.create({
      message: 'Carregando...'
    });
    carregando.present();

    this.cartaoService.cadastrar(this.cartao).subscribe((res: any) => {

      carregando.dismiss();
      const resultado: Resultado<Cartao> = new Resultado(this.cartao).deserialize(res);
      this.modalHelper.mostrarModal(this.alertController, 'Cadastro', 'Cadastro realizado com sucesso!', resultado)
        .then( modal => {
          modal.present();
        });
    }, err => {
      carregando.dismiss();
      this.modalHelper.mostrarModal(this.alertController, 'Cadastro', 'Falha ao realizar o cadastro, tente novamente mais tarde')
      .then( modal => {
        modal.present();
      });
    });
  }
}
