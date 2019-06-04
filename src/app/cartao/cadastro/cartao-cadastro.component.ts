import { Component, OnInit } from '@angular/core';
import { Cartao } from '../model/cartao.model';
import { AlertController, LoadingController } from '@ionic/angular';
import { CartaoService } from '../service/cartao.service';
import { ModalHelper } from '../../common/modal.helper';
import { Resultado } from '../../common/resultado.model';
import { Cliente } from 'src/app/cliente/model/cliente.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cartao-cadastro',
  templateUrl: './cartao-cadastro.component.html',
  styleUrls: ['./cartao-cadastro.component.scss'],
})
export class CartaoCadastroComponent implements OnInit {

  public funcao: () => void;
  public cartao: Cartao = new Cartao();
  private cliente: Cliente;

  constructor(private alertController: AlertController,
              private loadingController: LoadingController,
              private cartaoService: CartaoService,
              private modalHelper: ModalHelper,
              private router: Router) {

                const userString = localStorage.getItem('logged');
                this.cliente = new Cliente().deserialize(JSON.parse(userString));
                this.funcao = this.cadastrar.bind(this);
               }

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

    this.cartaoService.cadastrar(this.cartao, this.cliente.cpfCnpj).subscribe((res: any) => {

      carregando.dismiss();
      const resultado: Resultado<Cartao> = new Resultado(this.cartao).deserialize(res);
      this.modalHelper.mostrarModal(this.alertController, 'Cadastro', 'Cadastro realizado com sucesso!', resultado, () => {
        this.router.navigateByUrl('/cliente/cartoes');
      })
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
