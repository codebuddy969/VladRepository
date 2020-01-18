import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubeModalComponent } from './youtube-modal.component';

@NgModule({
  declarations: [YoutubeModalComponent],
  imports: [
    CommonModule
  ],
  exports: [YoutubeModalComponent]
})
export class YoutubeModalModule { }
