import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpoyPasteDirective } from './services/cpoy-paste.directive';



@NgModule({
  declarations: [
    CpoyPasteDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
