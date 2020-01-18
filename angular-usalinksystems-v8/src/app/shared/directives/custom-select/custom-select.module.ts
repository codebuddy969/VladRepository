import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomSelect} from './custom-select';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [CustomSelect],
    exports: [CustomSelect]
})
export class CustomSelectModule {
}
