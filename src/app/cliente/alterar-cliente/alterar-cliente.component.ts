import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../service/cliente.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { ModalHelper } from '../../common/modal.helper';
import { Cliente } from '../model/cliente.model';
import { Resultado } from '../../common/resultado.model';

@Component({
  selector: 'app-alterar-cliente',
  templateUrl: './alterar-cliente.component.html',
  styleUrls: ['./alterar-cliente.component.scss'],
})
export class AlterarClienteComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public funcao: () => void;
  private c: Cliente;
  constructor(private router: Router,
              private clienteService: ClienteService,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private modalHelper: ModalHelper) {
                this.funcao = this.alterar.bind(this);
                this.c = new Cliente().deserialize(JSON.parse(localStorage.getItem('logged')));
                this.carregarDados();
               }

  ngOnInit() {}

  async carregarDados() {
    const carregando = await this.loadingController.create({
      message: 'Carregando...'
    });

    carregando.present();

    this.clienteService.getInfo(this.c.cpfCnpj).subscribe( res => {
      const resultado = new Resultado(this.cliente).deserialize(res);
      this.cliente = resultado.entidades[0];
      carregando.dismiss();
    });
  }
  async alterar() {
    const carregando = await this.loadingController.create({
      message: 'Carregando...'
    });

    carregando.present();

    this.clienteService.alterar(this.cliente).subscribe(res => {
      carregando.dismiss();
      const resultado = new Resultado(this.cliente).deserialize(res);
      this.modalHelper.mostrarModal(this.alertController, 'Alterar', 'Dados alterados com sucesso!', resultado, () => {
        this.router.navigateByUrl('/cliente');
      })
      .then( modal => {
        modal.present();
      });
    },
    err => {
      carregando.dismiss();
      this.modalHelper.mostrarModal(this.alertController, 'Alterar', 'Sistema temporariamente indisponível. Tente novamente mais tarde')
      .then(modal => {
        modal.present();
      });
    });
  }

}
