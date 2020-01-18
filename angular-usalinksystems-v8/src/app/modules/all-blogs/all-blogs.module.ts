import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {EnjoyReadingModule} from '@components/enjoy-reading/enjoy-reading.module';
import {MostPopularModule} from '@components/most-popular/most-popular.module';
import {QuoteSectionModule} from '@components/quote-section/quote-section.module';
import {AllBlogsComponent} from './all-blogs.component';

const routes: Routes = [
    {
        path: '',
        component: AllBlogsComponent,
        data: {
            meta: {
                title: 'Boost your SERP ranking! Learn all the latest marketing trends & insights.',
                description: 'ULS\' copywriters & content specialists create blog posts that are informative, educational, practical, & useful for your business\' marketing plan & strategies.',
                keywords: 'marketing trends, insights, a blog, informative, educational, practical, useful marketing plan, marketing strategies, SERP, SERP ranking, copywriter, content specialist, blog posts'
            }
        }
    },
    {
        path: 'whats-new/blog/:page',
        component: AllBlogsComponent,
        data: {
            meta: {
                title: 'Boost your SERP ranking! Learn all the latest marketing trends & insights.',
                description: 'ULS\' copywriters & content specialists create blog posts that are informative, educational, practical, & useful for your business\' marketing plan & strategies.',
                keywords: 'marketing trends, insights, a blog, informative, educational, practical, useful marketing plan, marketing strategies, SERP, SERP ranking, copywriter, content specialist, blog posts'
            }
        }
    }
];

@NgModule({
    declarations: [AllBlogsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        HttpClientModule,
        MostPopularModule,
        EnjoyReadingModule,
        QuoteSectionModule
    ],
    exports: [RouterModule]
})
export class AllBlogsModule {
}
