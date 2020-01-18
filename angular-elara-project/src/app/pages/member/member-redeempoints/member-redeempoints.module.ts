import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from "@angular/router";
import {MemberRedeempointsComponent} from './member-redeempoints.component';
import {NbCardModule, NbIconModule, NbTooltipModule} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {Ng2SmartTableModule} from "ng2-smart-table";
import {MemberRedeemColumnComponent} from "@commonComponents/member-redeem-column/member-redeem-column.component";

const routes: Routes = [{
    path: '',
    component: MemberRedeempointsComponent
}];

@NgModule({
    declarations: [MemberRedeempointsComponent, MemberRedeemColumnComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NbCardModule,
        Ng2SmartTableModule,
        NbEvaIconsModule,
        NbIconModule,
        NbTooltipModule
    ],
    exports: [RouterModule],
    entryComponents: [MemberRedeemColumnComponent]
})
export class MemberRedeempointsModule {
}