import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockCopyPasteDirective } from './services/cpoy-paste.directive';
import { UpperCaseDirective } from './services/upper-case.directive';
import { LowercaseDirective } from './services/lowercase.directive';
import { ModelComponent } from './services/model/model.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';



@NgModule({
  declarations: [
    BlockCopyPasteDirective,
    UpperCaseDirective,
    LowercaseDirective,
    ModelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
  ],
  exports: [BlockCopyPasteDirective, UpperCaseDirective,LowercaseDirective]
})
export class SharedModule { }
