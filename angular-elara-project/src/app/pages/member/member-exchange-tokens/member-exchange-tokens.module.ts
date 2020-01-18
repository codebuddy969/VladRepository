import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NbCardModule, NbSelectModule, NbButtonModule, NbInputModule} from "@nebular/theme";
import {MemberExchangeTokensComponent} from './member-exchange-tokens.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [{
    path: '',
    component: MemberExchangeTokensComponent
}];

@NgModule({
    declarations: [MemberExchangeTokensComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NbCardModule,
        NbSelectModule,
        NbButtonModule,
        NbInputModule
    ],
    exports: [RouterModule]
})
export class MemberExchangeTokensModule {
}