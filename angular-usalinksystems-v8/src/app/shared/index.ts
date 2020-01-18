import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

@NgModule({
    exports: [
        CommonModule
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule {
}

export * from './providers';
export * from './interfaces';
export * from './directives';
export * from './utils';
export * from './validators';
export * from './services';
export * from './pipes';
// export { ApiService }
