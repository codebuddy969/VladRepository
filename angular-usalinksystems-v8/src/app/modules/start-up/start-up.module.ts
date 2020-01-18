import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TextMaskModule} from 'angular2-text-mask';
import {StartUpComponent} from './start-up.component';
import {AlertModalModule} from '@components/alert-modal/alert-modal.module';
import {QuoteSectionModule} from '@components/quote-section/quote-section.module';

const routes: Routes = [{
    path: '',
    component: StartUpComponent,
    data: {
        meta: {
            title: 'Are you a new startup company that needs to boost your online visibility?',
            description: 'Kickstart your small business with digital marketing assistance that will improve your search engine & social media optimization. Get your SERP ranking higher!',
            keywords: 'startup company, online visibility, small business, digital marketing, marketing assistance, search engine optimization, social media optimization, serp ranking'
        }
    }
}];

@NgModule({
    declarations: [StartUpComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        AlertModalModule,
        QuoteSectionModule,
        TextMaskModule
    ],
    exports: [RouterModule]
})
export class StartUpModule {
}
