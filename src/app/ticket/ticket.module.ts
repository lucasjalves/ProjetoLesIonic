import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TicketClienteComponent } from './ticket.page';
import { SharedModules } from '../modules/shared-modules.module';
const routes: Routes = [
  {
    path: '',
    component: TicketClienteComponent
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
  declarations: [TicketClienteComponent]
})
export class TicketPageModule {}
