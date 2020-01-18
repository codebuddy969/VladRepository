import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {PartnerMembersComponent} from './partner-members.component';
import {NbCardModule} from '@nebular/theme';
import {Ng2SmartTableModule} from "ng2-smart-table";

const routes: Routes = [{
    path: '',
    component: PartnerMembersComponent
}];

@NgModule({
    declarations: [PartnerMembersComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NbCardModule,
        Ng2SmartTableModule
    ]
})
export class PartnerMembersModule {
}
