import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SubscribeModalComponent} from './subscribe-modal.component';


@NgModule({
    declarations: [SubscribeModalComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [SubscribeModalComponent]
})
export class SubscribeModalModule {
}
