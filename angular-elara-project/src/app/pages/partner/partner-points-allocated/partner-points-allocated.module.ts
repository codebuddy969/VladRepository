import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PartnerPointsAllocatedComponent} from './partner-points-allocated.component';
import {RouterModule, Routes} from "@angular/router";
import {NbCardModule} from "@nebular/theme";
import {Ng2SmartTableModule} from "ng2-smart-table";

const routes: Routes = [{
    path: '',
    component: PartnerPointsAllocatedComponent
}];

@NgModule({
    declarations: [PartnerPointsAllocatedComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NbCardModule,
        Ng2SmartTableModule
    ],
    exports: [RouterModule]
})
export class PartnerPointsAllocatedModule {
}
