import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/cliente.model';
import { ClienteService } from '../service/cliente.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { Resultado } from '../../common/resultado.model';
import { ModalHelper } from '../../common/modal.helper';

@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.page.html',
  styleUrls: ['./cliente-cadastro.page.scss'],
})
export class ClienteCadastroPage implements OnInit {

  public cliente: Cliente = new Cliente();
  public dataMinima: string;
  public dataMax: string;
  constructor(private clienteService: ClienteService,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private modalHelper: ModalHelper) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.cliente = new Cliente();
    this.gerarData();
  }

  gerarData() {
    const data = new Date();
    const dataMax = new Date();
    data.setFullYear(data.getFullYear() - 100);
    dataMax.setFullYear(dataMax.getFullYear() - 18);
    this.dataMinima = data.toLocaleDateString().split('/').reverse().join('-');
    this.dataMax = dataMax.toLocaleDateString().split('/').reverse().join('-');
  }

  async cadastrar() {
    this.cliente.dtFormatada = new Date(this.cliente.dtNascimento).toLocaleDateString();
    this.cliente.ativo = true;

    const carregando = await this.loadingController.create({
      message: 'Carregando...'
    });

    carregando.present();

    this.clienteService.cadastrar(this.cliente).subscribe((res: any) => {

      carregando.dismiss();
      const resultado: Resultado<Cliente> = new Resultado(this.cliente).deserialize(res);
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
