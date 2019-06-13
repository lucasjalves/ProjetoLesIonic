import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SharedModules } from '../modules/shared-modules.module';
import { ProdutoDetalheComponent } from './detalhe/detalhe.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModules,
    RouterModule.forChild([
      {
        path: 'detalhe',
        component: ProdutoDetalheComponent
      }
    ],
    )
  ],
  declarations: [ProdutoDetalheComponent]
})
export class ProdutoModule {}
