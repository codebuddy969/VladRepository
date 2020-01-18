import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {NgxPageScrollCoreModule} from 'ngx-page-scroll-core';
import {AlertModalModule} from '@components/alert-modal/alert-modal.module';
import {SubscribeSectionModule} from '@components/subscribe-section/subscribe-section.module';
import {UnsubscribeModalModule} from '@components/unsubscribe-modal/unsubscribe-modal.module';
import {HomeComponent} from './home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: {
            meta: {
                title: 'USA Link System. A professional team for your business success!',
                description: 'ULS creates strong internet marketing campaigns & effective web presences for small to large size businesses. We work for your benefit!',
                keywords: 'direct marketing, marketing strategy, marketing agency, marketing consultant, marketing firm, brand marketing, internet marketing company, internet marketing service'
            }
        }
    }
];

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SubscribeSectionModule,
        UnsubscribeModalModule,
        AlertModalModule,
        NgxPageScrollCoreModule
    ]
})
export class HomeModule {
}
