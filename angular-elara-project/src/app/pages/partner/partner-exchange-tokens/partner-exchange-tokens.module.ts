import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NbCardModule, NbSelectModule, NbButtonModule, NbInputModule} from "@nebular/theme";
import {PartnerExchangeTokensComponent} from './partner-exchange-tokens.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [{
    path: '',
    component: PartnerExchangeTokensComponent
}];

@NgModule({
    declarations: [PartnerExchangeTokensComponent],
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
export class PartnerExchangeTokensModule {
}
