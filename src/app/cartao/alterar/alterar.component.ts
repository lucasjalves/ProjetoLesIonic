import { Component, OnInit } from '@angular/core';
import { Cartao } from '../model/cartao.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/cliente/model/cliente.model';
import { CartaoService } from '../service/cartao.service';
import { Resultado } from 'src/app/common/resultado.model';
import { LoadingController, AlertController } from '@ionic/angular';
import { ModalHelper } from 'src/app/common/modal.helper';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-alterar',
  templateUrl: './alterar.component.html',
  styleUrls: ['./alterar.component.scss'],
})
export class AlterarCartaoComponent implements OnInit {

  public cartao: Cartao = new Cartao();
  public funcao: () => void;
  public tituloBotao = 'Alterar';
  private cliente: Cliente = new Cliente();

  constructor(private route: ActivatedRoute,
              private cartaoService: CartaoService,
              private loadingController: LoadingController,
              private modalHelper: ModalHelper,
              private alertController: AlertController,
              private router: Router
              ) {
    const logged = localStorage.getItem('logged');
    this.cliente = new Cliente().deserialize(JSON.parse(logged));
    this.funcao = this.alterar.bind(this);

    this.setQueryParams();
  }

  async setQueryParams() {
    const carregando = await this.loadingController.create({
      message: 'Carregando...'
    });
    carregando.present();
    this.route.queryParams.subscribe( params => {
      this.cartaoService.getCartoesId(this.cliente.cpfCnpj, params.id).subscribe( res => {
          const resultado = new Resultado<Cartao>(new Cartao()).deserialize(res);
          const cartao = resultado.entidades[0];
          cartao.dtVencimento = new Date(cartao.dtVencimento).toString();
          this.cartao = cartao;
        }, err => {}
        , () => {
          carregando.dismiss();
        });
      });
  }
  ngOnInit() {}

  async alterar() {
    this.cartao.dtFormatado =  new Date(this.cartao.dtVencimento).toLocaleDateString();
    const carregando = await this.loadingController.create({
      message: 'Carregando...'
    });
    carregando.present();

    this.cartaoService.alterar(this.cartao).subscribe((res: any) => {

      carregando.dismiss();
      const resultado: Resultado<Cartao> = new Resultado(this.cartao).deserialize(res);
      this.modalHelper.mostrarModal(this.alertController, 'Alterar', 'Alteração realizada com sucesso!', resultado, () => {
        this.router.navigateByUrl('/cliente/cartoes');
      }).then( modal => {
          modal.present();
        });
    }, err => {
      carregando.dismiss();
      this.modalHelper.mostrarModal(this.alertController, 'Alterar', 'Falha ao realizar a alteração, tente novamente mais tarde')
      .then( modal => {
        modal.present();
      });
    });

  }

  async deletar() {
    const carregando = await this.loadingController.create({
      message: 'Carregando...'
    });

    const alert = await this.alertController.create({
      header: 'Deletar',
      message: 'Deseja deletar este cartão?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => carregando.dismiss()
      },
      {
        text: 'Sim',
        handler: () => {
          carregando.present();
          this.cartaoService.deletar(this.cartao).subscribe( res => {

            carregando.dismiss();
            const resultado: Resultado<Cartao> = new Resultado(this.cartao).deserialize(res);
            this.modalHelper.mostrarModal(this.alertController, 'Deletar', 'Cartão deletado com sucesso!', resultado, () => {

              this.router.navigateByUrl('/cliente/cartoes');

            }).then( modal => {

                modal.present();

              });
          }, err => {
            carregando.dismiss();

            this.modalHelper.mostrarModal(this.alertController, 'Deletar', 'Falha ao realizar a remoção, tente novamente mais tarde')
            .then( modal => {

              modal.present();

            });
          });
        }
      }]
    });
    alert.present();
  }

}
