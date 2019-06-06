import { Component, OnInit } from '@angular/core';
import { Endereco } from '../../model/endereco.model';
import { EnderecoService } from '../../service/endereco.service';
import { Cliente } from '../../../cliente/model/cliente.model';
import { AlertController, LoadingController } from '@ionic/angular';
import { ModalHelper } from '../../../common/modal.helper';
import { Router } from '@angular/router';
import { Resultado } from '../../../common/resultado.model';

@Component({
  selector: 'app-cadastro-endereco',
  templateUrl: './cadastro-endereco.component.html',
  styleUrls: ['./cadastro-endereco.component.scss'],
})
export class CadastroEnderecoComponent implements OnInit {

  public endereco: Endereco = new Endereco();
  public funcao: () => void;
  public tituloBotao = 'Cadastrar';
  public cliente: Cliente;

  constructor(private enderecoService: EnderecoService,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private modalHelper: ModalHelper,
              private router: Router) {
    const logged = localStorage.getItem('logged');
    const obj = JSON.parse(logged);
    this.cliente = new Cliente().deserialize(obj);
    this.funcao = this.cadastrar.bind(this);
  }

  ngOnInit() {}

  async cadastrar() {
    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });

    loading.present();
    this.enderecoService.salvarEndereco(this.cliente.cpfCnpj, this.endereco)
    .subscribe( res => {
      const resultado = new Resultado(new Endereco()).deserialize(res);
      loading.dismiss();
      this.modalHelper.mostrarModal(this.alertController, 'Cadastro', 'Endereço cadastrado com sucesso!', resultado, () => {
        this.router.navigateByUrl('/cliente/enderecos/listar');
      }).then(alert => {
        alert.present();
      });
    }, err => {
      loading.dismiss();
      this.modalHelper.mostrarModal(this.alertController, 'Cadastro', 'Sistema temporariamente indisponível. Tente novamente mais tarde')
      .then( alert => {
        alert.present();
      });
    });
  }
}
