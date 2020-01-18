import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PackagesModalComponent} from './packages-modal.component';

@NgModule({
    declarations: [PackagesModalComponent],
    imports: [
        CommonModule
    ],
    exports: [PackagesModalComponent]
})
export class PackagesModalModule {
}
