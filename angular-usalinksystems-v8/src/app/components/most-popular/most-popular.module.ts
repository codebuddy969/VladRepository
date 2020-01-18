import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MostPopularComponent} from './most-popular.component';

@NgModule({
    declarations: [MostPopularComponent],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [MostPopularComponent]
})
export class MostPopularModule {
}
