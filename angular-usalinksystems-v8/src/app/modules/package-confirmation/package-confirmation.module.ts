import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertModalModule} from '@components/alert-modal/alert-modal.module';
import {PackageConfirmationComponent} from './package-confirmation.component';
import {TextMaskModule} from 'angular2-text-mask';
import {KeysPipe} from '@app/shared';

const routes: Routes = [{
    path: '',
    component: PackageConfirmationComponent,
    data: {
        meta: {
            title: 'Digital marketing strategies that deliver measurable results.',
            description: 'We offer marketing packages that fit you. From SEO tools to design and tech, our creative team is here to help. Check out flexible marketing service prices.',
            keywords: 'digital marketing, marketing service price, design and technology, SEO marketing tools, design, technology, creative team, marketing packages, digital marketing strategies',
        }
    }
}];

@NgModule({
    declarations: [PackageConfirmationComponent, KeysPipe],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        AlertModalModule,
        TextMaskModule
    ],
    exports: [RouterModule]
})
export class PackageConfirmationModule {
}
