import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpfValidator } from '../directives/cpf.validator';
import { MaskDirective } from '../directives/mask.directive';
import { PaginaFooterComponent } from '../common/components/pagina-footer/pagina-footer.component';
import { IonicModule } from '@ionic/angular';
import { CarregandoComponent } from '../common/components/carregando/carregando.component';
import { MatExpansionPanel  } from '@angular/material';

@NgModule({
  declarations: [
    CpfValidator,
    MaskDirective,
    PaginaFooterComponent,
    CarregandoComponent,
    MatExpansionPanel
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    CpfValidator,
    MaskDirective,
    PaginaFooterComponent,
    CarregandoComponent,
    MatExpansionPanel
  ]
})
export class SharedModules { }
