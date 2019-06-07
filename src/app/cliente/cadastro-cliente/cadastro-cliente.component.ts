import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../service/cliente.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { ModalHelper } from '../../common/modal.helper';
import { Cliente } from '../model/cliente.model';
import { Resultado } from '../../common/resultado.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.scss'],
})
export class CadastroClienteComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public funcao: () => void;
  constructor(private clienteService: ClienteService,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private modalHelper: ModalHelper,
              private router: Router) {

    this.funcao = this.cadastrar.bind(this);
  }

  ngOnInit() {}

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
      this.modalHelper.mostrarModal(this.alertController, 'Cadastro', 'Cadastro realizado com sucesso!', resultado,
        () => {
          this.router.navigateByUrl('/');
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
