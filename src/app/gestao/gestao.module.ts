import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModules } from '../modules/shared-modules.module';
import { RouterModule, Routes } from '@angular/router';
import { PedidoConsultaGestaoComponent } from './pedido-consulta-gestao/pedido-consulta-gestao.component';
import { AdminGuard } from '../guards/admin.guard';
import { TicketConsultaGestaoComponent } from './ticket-consulta/ticket-consulta.component';
import { ProdutoConsultaGestaoComponent } from './produto/produto-consulta-gestao/produto-consulta-gestao.component';
import {ProdutoCadastroGestaoComponent} from './produto/produto-cadastro-gestao/produto-cadastro-gestao.component';

const routes: Routes = [
  {
    path: 'pedidos',
    component: PedidoConsultaGestaoComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'tickets',
    component: TicketConsultaGestaoComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'produtos',
    component: ProdutoConsultaGestaoComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'produtos/cadastro',
    component: ProdutoCadastroGestaoComponent,
    canActivate: [AdminGuard]
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
  declarations: [PedidoConsultaGestaoComponent,
    TicketConsultaGestaoComponent, ProdutoConsultaGestaoComponent]
})
export class GestaoModule { }
