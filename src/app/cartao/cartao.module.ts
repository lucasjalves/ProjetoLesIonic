import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CartaoListaPage } from './cartao.page';
import { SharedModules } from '../modules/shared-modules.module';
import { CartaoCadastroComponent } from './cadastro/cartao-cadastro.component';
import { AlterarCartaoComponent } from './alterar/alterar.component';
import { FormCartaoComponent } from './form/form.component';

const routes: Routes = [
  {
    path: '',
    component: CartaoListaPage
  },
  {
    path: 'cadastro',
    component: CartaoCadastroComponent
  },
  {
    path: 'alterar',
    component: AlterarCartaoComponent
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
  declarations: [CartaoListaPage, CartaoCadastroComponent, AlterarCartaoComponent, FormCartaoComponent]
})
export class CartaoListaPageModule {}
