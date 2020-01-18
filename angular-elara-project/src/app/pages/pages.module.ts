import {NgModule} from '@angular/core';
import {NbMenuModule} from '@nebular/theme';

import {ThemeModule} from '../@theme/theme.module';
import {PagesComponent} from './pages.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {ECommerceModule} from './e-commerce/e-commerce.module';
import {PagesRoutingModule} from './pages-routing.module';
import {MiscellaneousModule} from './miscellaneous/miscellaneous.module';
import {PartnerOffersModule} from "@partner/partner-offers/partner-offers.module";
import {PartnerRewardsModule} from "@partner/partner-rewards/partner-rewards.module";

@NgModule({
    imports: [
        PagesRoutingModule,
        ThemeModule,
        NbMenuModule,
        DashboardModule,
        ECommerceModule,
        MiscellaneousModule,
        PartnerOffersModule,
        PartnerRewardsModule,
    ],
    declarations: [
        PagesComponent
        // HomeComponent,
    ],
})
export class PagesModule {
}
