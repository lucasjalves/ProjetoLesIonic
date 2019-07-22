import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PedidoClientePage } from './pedido.page';
import { SharedModules } from '../modules/shared-modules.module';
import { DetalhePedidoComponent } from './detalhe-pedido/detalhe-pedido.component';
import { PedidoEfetivacaoComponent } from './pedido-efetivacao/pedido-efetivacao.component';
import { PedidoTrocaComponent } from './pedido-troca/pedido-troca.component';

const routes: Routes = [
  {
    path: 'cliente',
    component: PedidoClientePage
  },
  {
    path: 'detalhe',
    component: DetalhePedidoComponent
  },
  {
    path: 'efetivar',
    component: PedidoEfetivacaoComponent
  },
  {
    path: 'trocar',
    component: PedidoTrocaComponent
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
  declarations: [PedidoClientePage, DetalhePedidoComponent,
    PedidoEfetivacaoComponent, PedidoTrocaComponent]
})
export class PedidoPageModule {}
