import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClientePage } from './cliente.page';
import { SharedModules } from '../modules/shared-modules.module';
import { ClienteFormComponent } from './form/form.page';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { AlterarClienteComponent } from './alterar-cliente/alterar-cliente.component';

const routes: Routes = [
  {
    path: '',
    component: ClientePage
  },
  {
    path: 'cadastro',
    component: CadastroClienteComponent
  },
  {
    path: 'alterar',
    component: AlterarClienteComponent
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
  declarations: [ClientePage, ClienteFormComponent, CadastroClienteComponent, AlterarClienteComponent]
})
export class ClientePageModule {}
