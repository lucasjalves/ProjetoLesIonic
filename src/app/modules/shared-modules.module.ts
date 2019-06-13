import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpfValidator } from '../directives/cpf.validator';
import { MaskDirective } from '../directives/mask.directive';
import { PaginaFooterComponent } from '../common/components/pagina-footer/pagina-footer.component';
import { IonicModule } from '@ionic/angular';
import { CarregandoComponent } from '../common/components/carregando/carregando.component';
import { MatExpansionPanel, MatExpansionModule  } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  declarations: [
    CpfValidator,
    MaskDirective,
    PaginaFooterComponent,
    CarregandoComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PortalModule,
    MatExpansionModule
  ],
  exports: [
    CpfValidator,
    MaskDirective,
    PaginaFooterComponent,
    CarregandoComponent,
    MatExpansionModule
  ]
})
export class SharedModules { }
