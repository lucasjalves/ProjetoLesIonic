import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EnderecoListaPage } from './endereco.page';
import { SharedModules } from '../modules/shared-modules.module';
import { FormEnderecoComponent } from './form-endereco/form-endereco.component';
import { CadastroEnderecoComponent } from './cadastro/cadastro-endereco/cadastro-endereco.component';

const routes: Routes = [
  {
    path: 'listar',
    component: EnderecoListaPage
  },
  {
    path: 'cadastrar',
    component: CadastroEnderecoComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModules
  ],
  declarations: [EnderecoListaPage, FormEnderecoComponent, CadastroEnderecoComponent]
})
export class EnderecoPageModule {}
