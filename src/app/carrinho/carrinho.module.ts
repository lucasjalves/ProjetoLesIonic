import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CarrinhoPage } from './carrinho.page';
import { SharedModules } from '../modules/shared-modules.module';


const routes: Routes = [
  {
    path: '',
    component: CarrinhoPage
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
  declarations: [CarrinhoPage]
})
export class CarrinhoPageModule {}
