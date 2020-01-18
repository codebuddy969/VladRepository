import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {QuoteSectionModule} from '@components/quote-section/quote-section.module';
import {UsaComponent} from '@modules/departments/usa/usa.component';
import {IndiaComponent} from '@modules/departments/india/india.component';
import {PhilippinesComponent} from '@modules/departments/philippines/philippines.component';

const routes: Routes = [
    {
        path: 'los-angeles-usa',
        component: UsaComponent,
        data: {
            meta: {
                title: 'USA Link System\'s developers, copywriters, and designers',
                description: 'Our integrated branding and marketing team offers your brand keen strategy, creative, digital, experiential, media, PR and social skills.',
                keywords: 'best search engine optimization company, marketing seo, internet marketing experts, market online, search engine marketing agencies, internet marketing association'
            }
        }
    }, {
        path: 'lets-talk/india',
        component: IndiaComponent,
        data: {
            meta: {
                title: 'India Team of Usa Link System Company',
                description: 'Search for your online marketing manager in India. We are the best search engine optimization company, because we have years of experience in Web development',
                keywords: 'best internet marketing company, online marketing manager, local online marketing, search engine optimization consultant, search engine optimization agency'
            }
        }
    }, {
        path: 'lets-talk/philippines',
        component: PhilippinesComponent,
        data: {
            meta: {
                title: 'Philippines Team of Usa Link System Company',
                description: 'Our online advertising agency extends worldwide. We promote your website. Find local online marketing in Phillipines or apply for a job to us!',
                keywords: ''
            }
        }
    }
];

@NgModule({
    declarations: [UsaComponent, IndiaComponent, PhilippinesComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        QuoteSectionModule
    ],
    exports: [UsaComponent, IndiaComponent, PhilippinesComponent]
})
export class DepartmentsModule {
}
