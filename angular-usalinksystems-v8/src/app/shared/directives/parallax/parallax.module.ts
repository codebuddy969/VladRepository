import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {Parallax} from './parallax.directive';

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [Parallax],
    exports: [Parallax]
})
export class ParallaxModule {
}
