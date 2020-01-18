import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OurWorkComponent} from './our-work.component';
import {Routes, RouterModule} from '@angular/router';
import {QuoteSectionModule} from '@components/quote-section/quote-section.module';

const routes: Routes = [
    {
        path: '',
        component: OurWorkComponent,
        data: {
            meta: {
                title: 'What we do. We have great and creative Marketing Solutions ',
                description: 'We have one burning passion: connecting brands to customers. From conception and strategy to design and implementation we take your business to a new level',
                keywords: 'marketing advertising, search engine optimization companies, internet marketing strategies, web marketing, ppc marketing, seo optimization company'
            }
        }
    }
];

@NgModule({
    declarations: [OurWorkComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        QuoteSectionModule
    ],
    exports: [RouterModule]
})
export class OurWorkModule {
}
