import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteSectionComponent } from './quote-section.component';

@NgModule({
  declarations: [QuoteSectionComponent],
  imports: [
    CommonModule
  ],
  exports: [QuoteSectionComponent]
})
export class QuoteSectionModule { }
