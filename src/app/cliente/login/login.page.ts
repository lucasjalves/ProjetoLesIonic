import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../cliente/model/cliente.model';
import { ClienteService } from '../../cliente/service/cliente.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { ModalHelper } from '../../common/modal.helper';
import { Resultado } from '../../common/resultado.model';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../common/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  constructor(private clienteService: ClienteService,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private modalHelper: ModalHelper,
              private router: Router,
              private localStorageService: LocalStorageService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.cliente = new Cliente();
  }

  async login() {
    const carregando = await this.loadingController.create({
      message: 'Carregando...'
    });

    carregando.present();

    this.clienteService.login(this.cliente).subscribe( res => {
      carregando.dismiss();
      const resultado = new Resultado(this.cliente).deserialize(res);
      if (resultado.mensagens.length > 0) {
        this.modalHelper.mostrarModal(this.alertController, 'Login', '', resultado)
        .then( alert => {
          alert.present();
        });
      } else {
        this.localStorageService.setItem('logged', JSON.stringify(this.cliente.serialize()));
        this.router.navigateByUrl('/home');
      }
    },
    err => {
      carregando.dismiss();
      this.modalHelper.mostrarModal(this.alertController, 'Login', 'Sistema temporariamente indisponível. Tente novamente mais tarde')
      .then(alert => {
        alert.present();
      });
    });
  }
}
