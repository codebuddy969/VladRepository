import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {PlatonPageComponent} from './platon-page.component';
import {QuoteSectionModule} from '@components/quote-section/quote-section.module';

const routes: Routes = [{
    path: '',
    component: PlatonPageComponent,
    data: {
        meta: {
            title: 'Online marketing agency that’s a dog-friendly office. Get to know Platon!',
            description: "Our office dog helps our creative team to produce the best social media campaign & quality design and content strategy to boost our clients' online visibility.",
            keywords: 'office dog, dog, dog friendly office, online marketing agency, creative team, design and content, content strategy, social media, social media campaign'
        }
    }
}];

@NgModule({
    declarations: [PlatonPageComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        QuoteSectionModule
    ],
    exports: [RouterModule]
})
export class PlatonPageModule {
}
