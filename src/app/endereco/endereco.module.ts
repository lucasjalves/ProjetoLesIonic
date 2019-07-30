import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EnderecoListaPage } from './endereco.page';
import { SharedModules } from '../modules/shared-modules.module';
import { FormEnderecoComponent } from './form-endereco/form-endereco.component';
import { CadastroEnderecoComponent } from './cadastro/cadastro-endereco/cadastro-endereco.component';
import { AlterarCartaoComponent } from '../cartao/alterar/alterar.component';
import { AlterarEnderecoComponent } from './alterar/alterar-endereco/alterar-endereco.component';
import { ActiveGuard } from '../guards/active.guard';

const routes: Routes = [
  {
    path: 'listar',
    component: EnderecoListaPage,
    canActivate: [ActiveGuard]
  },
  {
    path: 'cadastrar',
    component: CadastroEnderecoComponent,
    canActivate: [ActiveGuard]
  },
  {
    path: 'alterar',
    component: AlterarEnderecoComponent,
    canActivate: [ActiveGuard]
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
  declarations: [EnderecoListaPage, FormEnderecoComponent, CadastroEnderecoComponent, AlterarEnderecoComponent]
})
export class EnderecoPageModule {}
