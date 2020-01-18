import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {QuoteSectionModule} from '@components/quote-section/quote-section.module';
import {PrivacyAndPolicyComponent} from './privacy-and-policy.component';

const routes: Routes = [{
    path: 'privacy-and-policy',
    component: PrivacyAndPolicyComponent,
    data: {
        meta: {
            title: 'Join Us. Join our internet marketing company',
            description: 'Be a part of the our talented and experienced team. We are ready to get you on board. Become search engine optimization experts in our company! Join us',
            keywords: 'successful marketing campaigns, promote website, best advertising campaigns, marketing campaign ideas, search engine optimization experts'
        }
    }
}];

@NgModule({
    declarations: [PrivacyAndPolicyComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        QuoteSectionModule
    ]
})
export class PrivacyAndPolicyModule {
}
