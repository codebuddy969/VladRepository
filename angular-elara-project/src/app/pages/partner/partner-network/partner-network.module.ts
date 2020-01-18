import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule} from '@nebular/theme';
import {PartnerNetworkComponent, FsIconComponent} from './partner-network.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [{
    path: '',
    component: PartnerNetworkComponent
}];

@NgModule({
    declarations: [PartnerNetworkComponent, FsIconComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NbCardModule,
        NbTreeGridModule,
        NbIconModule,
        NbInputModule
    ],
    exports: [RouterModule]
})
export class PartnerNetworkModule {
}
