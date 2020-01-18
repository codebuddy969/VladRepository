import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PackagesContactModule} from '@components/packages-contact/packages-contact.module';
import {PackagesModalModule} from '@components/packages-modal/packages-modal.module';
import {QuoteSectionModule} from '@components/quote-section/quote-section.module';
import {PackagesComponent} from './packages.component';

const routes: Routes = [
    {
        path: '',
        component: PackagesComponent,
        data: {
            meta: {
                title: 'Flexible digital marketing packages to suit your business’ needs.',
                description: 'Looking for ways to boost your brand’s online presence, social engagement, and marketing campaigns? Flexibility is key to your success. Check out our plans!',
                keywords: 'marketing campaigns, digital marketing, online presence, social engagement'
            }
        }
    },{
        path: 'packages/:options',
        component: PackagesComponent,
        data: {
            meta: {
                title: 'Looking for ways to improve your business and marketing plan?',
                description: 'Our flexible packages or a-la-carte options are developed to boost your online presence to create for your brand.',
                keywords: 'business and marketing, marketing plan, online presence, online visibility'
            }
        }
    }
];

@NgModule({
    declarations: [PackagesComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        PackagesModalModule,
        PackagesContactModule,
        QuoteSectionModule
    ],
    exports: [RouterModule]
})
export class PackagesModule {
}
