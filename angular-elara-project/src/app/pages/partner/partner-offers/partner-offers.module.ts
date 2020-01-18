import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PartnerOffersComponent} from './partner-offers.component';
import {NbCardModule} from '@nebular/theme';
import {Ng2SmartTableModule} from "ng2-smart-table";

@NgModule({
    declarations: [PartnerOffersComponent],
    imports: [
        CommonModule,
        NbCardModule,
        Ng2SmartTableModule
    ]
})
export class PartnerOffersModule {
}
