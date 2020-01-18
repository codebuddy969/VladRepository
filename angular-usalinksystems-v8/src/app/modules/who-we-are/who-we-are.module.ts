import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WhoWeAreComponent} from './who-we-are.component';
import {Routes, RouterModule} from '@angular/router';
import {QuoteSectionModule} from '@components/quote-section/quote-section.module';

const routes: Routes = [{
    path: '',
    component: WhoWeAreComponent,
    data: {
        meta: {
            title: 'Who we are. We are marketing agency, web creators and designers',
            description: 'We provide our clients quality marketing & advertising campaigns. Our websites provide great performance on Google & gain visitors, maximize business profits',
            keywords: 'best marketing campaigns, online marketing consultant, search engine optimization services-old, sem agency, online marketing services-old, search ads'
        }
    }
}];

@NgModule({
    declarations: [WhoWeAreComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        QuoteSectionModule
    ],
    exports: [RouterModule]
})
export class WhoWeAreModule {
}
