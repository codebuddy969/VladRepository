import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertModalModule} from '@components/alert-modal/alert-modal.module';
import {SubscribeSectionComponent} from './subscribe-section.component';

@NgModule({
    declarations: [SubscribeSectionComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AlertModalModule,
        HttpClientModule
    ],
    exports: [SubscribeSectionComponent]
})
export class SubscribeSectionModule {
}
