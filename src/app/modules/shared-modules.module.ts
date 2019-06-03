import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpfValidator } from '../directives/cpf.validator';
import { MaskDirective } from '../directives/mask.directive';

@NgModule({
  declarations: [CpfValidator, MaskDirective],
  imports: [
    CommonModule
  ],
  exports: [CpfValidator, MaskDirective]
})
export class SharedModules { }
