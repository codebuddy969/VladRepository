import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TextMaskModule} from 'angular2-text-mask';
import {NonProfitComponent} from './non-profit.component';
import {AlertModalModule} from '@components/alert-modal/alert-modal.module';
import {QuoteSectionModule} from '@components/quote-section/quote-section.module';

const routes: Routes = [{
    path: '',
    component: NonProfitComponent,
    data: {
        meta: {
            title: 'An internet marketing agency that ensures good deeds don’t go unnoticed!',
            description: 'Our copywriters, social media specialists, & digital marketing managers create detail-oriented marketing strategies and plan to boost your online visibility!',
            keywords: 'internet marketing agency, copywriters, social media specialists, digital marketing managers, marketing strategies, online visibility'
        }
    }
}];

@NgModule({
    declarations: [NonProfitComponent],
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
export class NonProfitModule {
}
