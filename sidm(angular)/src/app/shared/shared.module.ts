import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockCopyPasteDirective } from './services/cpoy-paste.directive';
import { UpperCaseDirective } from './services/upper-case.directive';
import { LowercaseDirective } from './services/lowercase.directive';



@NgModule({
  declarations: [
    BlockCopyPasteDirective,
    UpperCaseDirective,
    LowercaseDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [BlockCopyPasteDirective, UpperCaseDirective]
})
export class SharedModule { }
