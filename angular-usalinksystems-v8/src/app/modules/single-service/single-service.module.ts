import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {QuoteSectionModule} from '@components/quote-section/quote-section.module';
import {SingleServiceComponent} from './single-service.component';

const routes: Routes = [
    {
        path: '',
        component: SingleServiceComponent,
        data: {
            meta: {
                title: 'The online marketing agency providing creative solutions for your brand! ',
                description: 'Improve your social media campaign, SERP ranking, & online visibility. Content specialists, designers, and developers use the best SEO, online marketing tools.',
                keywords: 'online marketing agency, creative solutions, content specialist, seo marketing tools, online marketing tools, social media campaign, serp ranking, online visibility'
            }
        }
    }
];

@NgModule({
    declarations: [SingleServiceComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        QuoteSectionModule
    ],
    exports: [RouterModule]
})
export class SingleServiceModule {
}
