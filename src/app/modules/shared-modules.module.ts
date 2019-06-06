import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpfValidator } from '../directives/cpf.validator';
import { MaskDirective } from '../directives/mask.directive';
import { PaginaFooterComponent } from '../common/components/pagina-footer/pagina-footer.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [CpfValidator, MaskDirective, PaginaFooterComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [CpfValidator, MaskDirective, PaginaFooterComponent]
})
export class SharedModules { }
