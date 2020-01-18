import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FacebookModule} from 'ngx-facebook';
import {AlertModalModule} from '@components/alert-modal/alert-modal.module';
import {SubscribeSectionModule} from '@components/subscribe-section/subscribe-section.module';
import {EnjoyReadingModule} from '@components/enjoy-reading/enjoy-reading.module';
import {MostPopularModule} from '@components/most-popular/most-popular.module';
import {VlogSectionModule} from '@components/vlog-section/vlog-section.module';
import {PreloaderModule} from '@components/preloader/preloader.module';
import {SubscribeModalModule} from '@components/subscribe-modal/subscribe-modal.module';
import {ShareModule} from '@ngx-share/core';
import {SinglePostComponent} from './single-post.component';

const routes: Routes = [{
    path: '',
    component: SinglePostComponent,
    data: {
        meta: {
            title: 'Join Us. Join our internet marketing company',
            description: 'Be a part of the our talented and experienced team. We are ready to get you on board. Become search engine optimization experts in our company! Join us',
            keywords: 'successful marketing campaigns, promote website, best advertising campaigns, marketing campaign ideas, search engine optimization experts'
        }
    }
}];

@NgModule({
    declarations: [SinglePostComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FacebookModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        AlertModalModule,
        SubscribeSectionModule,
        EnjoyReadingModule,
        MostPopularModule,
        VlogSectionModule,
        PreloaderModule,
        SubscribeModalModule,
        ShareModule
    ]
})
export class SinglePostModule {
}
