import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from "@angular/router";
import {MemberDashboardComponent} from './member-dashboard.component';
import {NbCardModule} from '@nebular/theme';
import {Ng2SmartTableModule} from "ng2-smart-table";

const routes: Routes = [{
    path: '',
    component: MemberDashboardComponent
}];

@NgModule({
    declarations: [MemberDashboardComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NbCardModule,
        Ng2SmartTableModule
    ],
    exports: [RouterModule]
})
export class MemberDashboardModule {
}