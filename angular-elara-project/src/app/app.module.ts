/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from './@core/core.module';
import {ThemeModule} from './@theme/theme.module';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {
    NbCardModule,
    NbChatModule,
    NbDatepickerModule,
    NbDialogModule, NbLayoutModule,
    NbMenuModule,
    NbSidebarModule,
    NbToastrModule,
    NbWindowModule,
    NbAlertModule
} from '@nebular/theme';
import {LoginComponent} from './pages/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegistrationComponent} from './pages/registration/registration.component';
import {HomeComponent} from './pages/home/home.component';
import {Ng2SmartTableModule} from "ng2-smart-table";

import {MemberLoginComponent} from "@member/member-login/member-login.component";
import {PartnerLoginComponent} from "@partner/partner-login/partner-login.component";
import {MemberRegistrationComponent} from "@member/member-registration/member-registration.component";
import {PartnerRegistrationComponent} from "@partner/partner-registration/partner-registration.component";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegistrationComponent,
        HomeComponent,
        MemberLoginComponent,
        PartnerLoginComponent,
        MemberRegistrationComponent,
        PartnerRegistrationComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        NbLayoutModule,
        ReactiveFormsModule,
        Ng2SmartTableModule,
        ThemeModule.forRoot(),

        NbSidebarModule.forRoot(),
        NbMenuModule.forRoot(),
        NbDatepickerModule.forRoot(),
        NbDialogModule.forRoot(),
        NbWindowModule.forRoot(),
        NbToastrModule.forRoot(),
        NbChatModule.forRoot({
            messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
        }),
        CoreModule.forRoot(),
        NbCardModule,
        NbAlertModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
