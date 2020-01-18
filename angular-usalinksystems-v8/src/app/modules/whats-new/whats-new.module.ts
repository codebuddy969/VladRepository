import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {WhatsNewComponent} from './whats-new.component';
import {NgxGalleryModule} from 'ngx-gallery';
import {SubscribeSectionModule} from '@components/subscribe-section/subscribe-section.module';
import {QuoteSectionModule} from '@components/quote-section/quote-section.module';
import {VlogSectionModule} from '@components/vlog-section/vlog-section.module';
import {HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';

const routes: Routes = [
    {
        path: '',
        component: WhatsNewComponent,
        data: {
            meta: {
                title: 'Read our latest blog posts & recent business and marketing events in LA.',
                description: 'Our clients & partners are our greatest priority. From blog articles, marketing content & trends in design, technology, & lifestyle news, ULS has you covered!',
                keywords: 'blog articles, design and technology, design, technology, lifestyle, lifestyle news, articles, business and marketing'
            }
        }
    }
];

export class CustomHammerConfig extends HammerGestureConfig  {
    overrides = {
        pinch: { enable: false },
        rotate: { enable: false }
    };
}

@NgModule({
    declarations: [WhatsNewComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SubscribeSectionModule,
        QuoteSectionModule,
        VlogSectionModule,
        NgxGalleryModule
    ],
    providers: [{ provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }],
    exports: [RouterModule]
})
export class WhatsNewModule {
}

