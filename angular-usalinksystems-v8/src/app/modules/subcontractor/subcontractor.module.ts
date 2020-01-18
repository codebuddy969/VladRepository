import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TextMaskModule} from 'angular2-text-mask';
import {SubcontractorComponent} from './subcontractor.component';
import {AlertModalModule} from '@components/alert-modal/alert-modal.module';
import {QuoteSectionModule} from '@components/quote-section/quote-section.module';

const routes: Routes = [{
    path: '',
    component: SubcontractorComponent,
    data: {
        meta: {
            title: 'Ease up your workload. Subcontract your marketing projects with us!',
            description: 'Web development agency & internet marketing agency partner with ULS for search engine advertising, social media campaigns, & other digital marketing needs?',
            keywords: 'marketing projects, web development agency, internet marketing agency, search engine advertising, social media campaigns'
        }
    }
}];

@NgModule({
    declarations: [SubcontractorComponent],
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
export class SubcontractorModule {
}
