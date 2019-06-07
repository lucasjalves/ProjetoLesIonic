import { Component, OnInit } from '@angular/core';
import { ClienteService } from './service/cliente.service';
import { Cliente } from './model/cliente.model';
import { LoadingController } from '@ionic/angular';
import { Resultado } from '../common/resultado.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

  public cliente: Cliente = new Cliente();
  constructor(private clienteService: ClienteService,
              private loadingController: LoadingController,
              private router: Router) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.getInfo();
  }

  async getInfo() {
    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });

    loading.present();
    const logado = localStorage.getItem('logged');
    const cli = new Cliente().deserialize(JSON.parse(logado));

    this.clienteService.getInfo(cli.cpfCnpj).subscribe( res => {
      loading.dismiss();
      const resultado = new Resultado(cli).deserialize(res);
      this.cliente = resultado.entidades[0];
    },
    err => {
      loading.dismiss();
    });
  }

  alterar() {
    this.router.navigateByUrl('cliente/alterar');
  }
}
