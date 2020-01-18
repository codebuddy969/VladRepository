import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PartnerPointsRedeemedComponent} from './partner-points-redeemed.component';
import {RouterModule, Routes} from "@angular/router";
import {NbCardModule} from "@nebular/theme";
import {Ng2SmartTableModule} from "ng2-smart-table";

const routes: Routes = [{
    path: '',
    component: PartnerPointsRedeemedComponent
}];

@NgModule({
    declarations: [PartnerPointsRedeemedComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NbCardModule,
        Ng2SmartTableModule
    ],
    exports: [RouterModule]
})
export class PartnerPointsRedeemedModule {
}
