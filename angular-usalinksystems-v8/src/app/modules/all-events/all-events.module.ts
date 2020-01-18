import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {QuoteSectionModule} from '@components/quote-section/quote-section.module';
import {AllEventsComponent} from './all-events.component';
import {NgxGalleryModule} from 'ngx-gallery';

const routes: Routes = [{
    path: '',
    component: AllEventsComponent,
    data: {
        meta: {
            title: 'Check out our recent business and marketing events in Los Angeles! ',
            description: 'Attending small business events to Educate brands on new trends in marketing. Learn to maximize marketing efforts to rise to the top of the search results page.',
            keywords: 'business and marketing, marketing and events, new trends in marketing, marketing efforts, small business events, business events, new trends in marketing, marketing efforts, search results page'
        }
    }
}];

@NgModule({
    declarations: [AllEventsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        QuoteSectionModule,
        NgxGalleryModule
    ],
    exports: [RouterModule]
})
export class AllEventsModule {
}
