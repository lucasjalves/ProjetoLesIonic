import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CartaoListaPage } from './cartao.page';
import { SharedModules } from '../modules/shared-modules.module';
import { CartaoCadastroComponent } from './cadastro/cartao-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: CartaoListaPage
  },
  {
    path: 'cadastro',
    component: CartaoCadastroComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModules,
    RouterModule.forChild(routes)
  ],
  declarations: [CartaoListaPage, CartaoCadastroComponent]
})
export class CartaoListaPageModule {}
