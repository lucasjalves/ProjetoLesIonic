import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnderecoService } from '../../service/endereco.service';
import { Endereco } from '../../model/endereco.model';
import { Cliente } from '../../../cliente/model/cliente.model';
import { Resultado } from '../../../common/resultado.model';
import { AlertController, LoadingController } from '@ionic/angular';
import { ModalHelper } from '../../../common/modal.helper';

@Component({
  selector: 'app-alterar-endereco',
  templateUrl: './alterar-endereco.component.html',
  styleUrls: ['./alterar-endereco.component.scss'],
})
export class AlterarEnderecoComponent implements OnInit {

  public endereco: Endereco = new Endereco();
  public funcao: () => void;
  public tituloBotao = 'Alterar';
  public cliente: Cliente;
  constructor(private activeRoute: ActivatedRoute,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private enderecoService: EnderecoService,
              private modalHelper: ModalHelper,
              private router: Router) {

                this.setQueryParams();
                this.funcao = this.alterar.bind(this);
               }

  ngOnInit() {}

  async setQueryParams() {
    const loading = await this.loadingController.create({
      message: 'Carrengando...'
    });

    loading.present();

    this.activeRoute.queryParams.subscribe(params => {
      loading.dismiss();
      this.enderecoService.getEnderecoId(params.id).subscribe( res => {
        const resultado = new Resultado(new Endereco()).deserialize(res);
        this.endereco = resultado.entidades[0];
      });
    },
   err => {
     loading.dismiss();
   });
  }

  async deletar() {
    const loading = await this.alertController.create({
      message: 'Carrengando...'
    });

    loading.present();
    const alerta = await this.alertController.create({
      header: 'Deletar',
      message: 'Deseja deletar este endereço?',
      buttons: [{
        text: 'Não',
        role: 'cancel',
        handler: () => loading.dismiss()
      }, {
        text: 'Sim',
        handler: () => {
          loading.present();
          this.enderecoService.deletar(this.endereco.id).subscribe( res => {
            loading.dismiss();
            const resultado = new Resultado(new Endereco()).deserialize(res);
            this.modalHelper.mostrarModal(this.alertController, 'Deletar', 'Endereco Deletado com sucesso!', resultado, () => {

              this.router.navigateByUrl('cliente/enderecos/listar');

            })
            .then(modal => {
              modal.present();
            }); // mostrarModal
          }, err => {
            this.modalHelper.mostrarModal(this.alertController,
              'Deletar', 'Sistema temporariamente indisponível. Tente novamente mais tarde')
            .then( modal => {
              modal.present();
            });
            loading.dismiss();
          }); // service
        }// handler
      }]// buttons
    }); // controller

    alerta.present();
  }

  async alterar() {

    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });

    loading.present();
    this.enderecoService.alterar(this.endereco).subscribe( res => {
      loading.dismiss();
      const resultado = new Resultado(new Endereco()).deserialize(res);
      this.modalHelper.mostrarModal(this.alertController, 'Alteração', 'Endereceço alterado com sucesso',
        resultado, () => {this.router.navigateByUrl('/cliente/enderecos/listar'); })
      .then( modal => {
        modal.present();
      });
    }, err => {
      loading.dismiss();
      this.modalHelper.mostrarModal(this.alertController, 'Alteração', 'Sistema temporariamente indisponível. Tente novamente mais tarde')
      .then( modal => {
        modal.present();
      });
    });
  }
}
