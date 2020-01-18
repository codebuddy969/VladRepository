import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {EnjoyReadingComponent} from './enjoy-reading.component';

@NgModule({
    declarations: [EnjoyReadingComponent],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [EnjoyReadingComponent]
})
export class EnjoyReadingModule {
}
