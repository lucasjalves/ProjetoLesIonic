import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TicketClienteComponent } from './ticket.page';
import { SharedModules } from '../modules/shared-modules.module';
import { TicketEfetivacaoComponent } from './ticket-efetivacao/ticket-efetivacao.component';
import { ActiveGuard } from '../guards/active.guard';
const routes: Routes = [
  {
    path: '',
    component: TicketClienteComponent,
    canActivate: [ActiveGuard]
  },
  {
    path: 'efetivar',
    component: TicketEfetivacaoComponent,
    canActivate: [ActiveGuard]
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
  declarations: [TicketClienteComponent, TicketEfetivacaoComponent]
})
export class TicketPageModule {}
