import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule} from '@angular/router';

import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';

import {AppComponent} from './app.component';
import {PagesModule} from '@modules/pages.module';
import {ErrorPageModule} from '@modules/error-page/error-page.module';
import {DepartmentsModule} from '@modules/departments/departments.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        RouterModule.forRoot([], {
            preloadingStrategy: PreloadAllModules,
            scrollPositionRestoration: 'enabled'
        }),
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        PagesModule,
        DepartmentsModule,
        ErrorPageModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
