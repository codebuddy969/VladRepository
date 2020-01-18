import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {CharCount} from './char-count.directive';

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [CharCount],
    exports: [CharCount]
})
export class CharCountModule {
}
