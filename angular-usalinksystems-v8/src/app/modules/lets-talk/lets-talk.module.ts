import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LetsTalkComponent} from './lets-talk.component';
import {TextMaskModule } from 'angular2-text-mask';
import {AlertModalModule} from '@components/alert-modal/alert-modal.module';
import {QuoteSectionModule} from '@components/quote-section/quote-section.module';
import {HttpClientModule} from '@angular/common/http';

const routes: Routes = [{
    path: '',
    component: LetsTalkComponent,
    data: {
        meta: {
            title: 'Need a social media marketing plan for your business? Let’s talk!',
            description: 'For questions about marketing, advertising opportunities and ideas, send us a message. Our digital marketing managers will reach out to you shortly.',
            keywords: 'marketing opportunities, advertising opportunities, advertising ideas, marketing plan, social media marketing, social media business, let’s talk, digital marketing manager'
        }
    }
}];

@NgModule({
    declarations: [LetsTalkComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TextMaskModule,
        AlertModalModule,
        QuoteSectionModule,
        HttpClientModule
    ],
    exports: [RouterModule]
})
export class LetsTalkModule {
}
