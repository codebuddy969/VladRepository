import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {CustomSelectModule} from '@app/shared';
import {QuoteSectionModule} from '@components/quote-section/quote-section.module';
import {AlertModalModule} from '@components/alert-modal/alert-modal.module';
import {TextMaskModule} from 'angular2-text-mask';
import {JoinUsComponent} from './join-us.component';

const routes: Routes = [{
    path: '',
    component: JoinUsComponent,
    data: {
        meta: {
            title: 'Looking for digital marketing jobs? Career change now & Join us at ULS!',
            description: 'New opportunities await you in one of the top advertising agencies in LA. Design original advertising campaigns that push the boundaries of creativity. Join us!',
            keywords: 'join us, join us at, career change, digital marketing jobs, top advertising agencies, creative team, new opportunities'
        }
    }
}];

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [JoinUsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        CustomSelectModule,
        AlertModalModule,
        QuoteSectionModule,
        TextMaskModule
    ],
    exports: [RouterModule]
})
export class JoinUsModule {
}
