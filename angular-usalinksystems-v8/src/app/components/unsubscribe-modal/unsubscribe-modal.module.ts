import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UnsubscribeModalComponent} from './unsubscribe-modal.component';


@NgModule({
    declarations: [UnsubscribeModalComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [UnsubscribeModalComponent]
})
export class UnsubscribeModalModule {
}
