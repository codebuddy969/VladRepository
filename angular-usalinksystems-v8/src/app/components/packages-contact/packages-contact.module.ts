import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PackagesContactComponent} from './packages-contact.component';

@NgModule({
    declarations: [PackagesContactComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [PackagesContactComponent]
})
export class PackagesContactModule {
}
