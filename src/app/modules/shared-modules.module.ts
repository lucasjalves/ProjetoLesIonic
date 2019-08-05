import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CpfValidator } from '../directives/cpf.validator';
import { MaskDirective } from '../directives/mask.directive';
import { PaginaFooterComponent } from '../common/components/pagina-footer/pagina-footer.component';
import { IonicModule } from '@ionic/angular';
import { CarregandoComponent } from '../common/components/carregando/carregando.component';
import { MatExpansionPanel, MatExpansionModule  } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PortalModule } from '@angular/cdk/portal';
import { NgxCurrencyModule } from 'ngx-currency';

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
    MatExpansionModule,
    NgxCurrencyModule
  ],
  exports: [
    CpfValidator,
    MaskDirective,
    PaginaFooterComponent,
    CarregandoComponent,
    MatExpansionModule,
    NgxCurrencyModule
  ],
  providers: [
    CurrencyPipe
  ]
})
export class SharedModules { }
