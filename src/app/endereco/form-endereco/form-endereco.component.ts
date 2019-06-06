import { Component, OnInit, Input } from '@angular/core';
import { Endereco } from '../model/endereco.model';
import { CepService } from '../service/cep.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-form-endereco',
  templateUrl: './form-endereco.component.html',
  styleUrls: ['./form-endereco.component.scss'],
})
export class FormEnderecoComponent implements OnInit {


  @Input() public endereco: Endereco = new Endereco();
  @Input() public funcao: () => void;
  @Input() public tituloBotao: string;
  public apiCalled = false;
  constructor(private cepService: CepService,
              private alertController: AlertController,
              private loadingController: LoadingController) { }

  ngOnInit() {}

  async buscarCep(valido) {
    if (!valido) {
      return;
    }
    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });

    loading.present();

    const alert = await this.alertController.create({
      header: 'Erro',
      message: 'CEP não encontrado',
      buttons: ['OK']
    });
    this.cepService.getCep(this.endereco.cep.replace(/\D/g, '')).subscribe( (res: any) => {
      loading.dismiss();
      if (res.localidade == null || res.localidade.length === 0) {
        alert.present();
        return;
      }
      this.endereco.cidade = res.localidade;
      this.endereco.rua = res.logradouro;
      this.endereco.uf = res.uf;
      this.endereco.bairro = res.bairro;
      this.endereco.cep = res.cep;
      this.endereco.pais = 'Brasil';
      this.apiCalled = true;
    },
   err => {
    loading.dismiss();
    alert.present();
   });
  }
}
