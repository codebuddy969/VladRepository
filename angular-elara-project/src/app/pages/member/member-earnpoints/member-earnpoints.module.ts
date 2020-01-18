import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from "@angular/router";
import {MemberEarnpointsComponent} from "./member-earnpoints.component";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {NbCardModule, NbIconModule, NbTooltipModule} from '@nebular/theme';
import {NbEvaIconsModule } from '@nebular/eva-icons';
import {MemberEarnpointsButtonComponent} from "@commonComponents/member-earnpoints-button/member-earnpoints-button.component";

const routes: Routes = [{
    path: '',
    component: MemberEarnpointsComponent
}];

@NgModule({
    declarations: [MemberEarnpointsComponent, MemberEarnpointsButtonComponent],
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
    entryComponents: [MemberEarnpointsButtonComponent]
})
export class MemberEarnpointsModule {
}
