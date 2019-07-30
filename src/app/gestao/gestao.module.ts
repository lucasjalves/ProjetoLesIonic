import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModules } from '../modules/shared-modules.module';
import { RouterModule, Routes } from '@angular/router';
import { PedidoConsultaGestaoComponent } from './pedido-consulta-gestao/pedido-consulta-gestao.component';

const routes: Routes = [
  {
    path: '',
    component: PedidoConsultaGestaoComponent
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
  declarations: [PedidoConsultaGestaoComponent]
})
export class GestaoModule { }
