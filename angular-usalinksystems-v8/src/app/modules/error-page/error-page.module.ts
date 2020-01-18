import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorPageComponent} from './error-page.component';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {path: '404', component: ErrorPageComponent},
    {path: '**', redirectTo: '/404'}
];

@NgModule({
    declarations: [ErrorPageComponent],
    imports: [
        BrowserModule,
        RouterModule.forChild(routes),
        CommonModule
    ]
})
export class ErrorPageModule {
}
