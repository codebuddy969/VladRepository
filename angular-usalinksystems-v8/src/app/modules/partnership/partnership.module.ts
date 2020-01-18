import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TextMaskModule} from 'angular2-text-mask';
import {PartnershipComponent} from './partnership.component';
import {AlertModalModule} from '@components/alert-modal/alert-modal.module';
import {QuoteSectionModule} from '@components/quote-section/quote-section.module';

const routes: Routes = [{
    path: '',
    component: PartnershipComponent,
    data: {
        meta: {
            title: 'Internet marketing agency that breathes life to your small business.',
            description: "Our creative team comprised of the best graphic designers, copywriters, & web and app developers produce marketing strategies your brand needs. Let's talk!",
            keywords: 'internet marketing agency, small business, best graphic designers, copywriters, marketing strategies, brand marketing, let’s talk'
        }
    }
}];

@NgModule({
    schemas: [],
    declarations: [PartnershipComponent],
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
export class PartnershipModule {
}
