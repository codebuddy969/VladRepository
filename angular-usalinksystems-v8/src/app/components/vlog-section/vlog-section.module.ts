import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {VlogSectionComponent} from './vlog-section.component';
import {YoutubeModalModule} from '@components/youtube-modal/youtube-modal.module';

@NgModule({
    declarations: [VlogSectionComponent],
    imports: [
        CommonModule,
        YoutubeModalModule,
        RouterModule
    ],
    exports: [VlogSectionComponent]
})
export class VlogSectionModule {
}
