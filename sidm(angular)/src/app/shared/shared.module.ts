import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockCopyPasteDirective } from './services/cpoy-paste.directive';



@NgModule({
  declarations: [
    BlockCopyPasteDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [BlockCopyPasteDirective]
})
export class SharedModule { }
