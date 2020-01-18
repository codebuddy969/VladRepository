import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';

import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {ECommerceComponent} from '@pages/e-commerce/e-commerce.component';
import {NotFoundComponent} from '@pages/miscellaneous/not-found/not-found.component';
import {PartnerOffersComponent} from "@partner/partner-offers/partner-offers.component";

const routes: Routes = [{
    path: '',
    component: PagesComponent,
    children: [
        {
            path: 'dashboard',
            component: ECommerceComponent,
        },
        {
            path: 'partner-offers',
            component: PartnerOffersComponent,
        },
        {
            path: 'partner-rewards',
            loadChildren: () => import('@partner/partner-rewards/partner-rewards.module')
                .then(m => m.PartnerRewardsModule),
        },
        {
            path: 'partner-points-allocated',
            loadChildren: () => import('@partner/partner-points-allocated/partner-points-allocated.module')
                .then(m => m.PartnerPointsAllocatedModule),
        },
        {
            path: 'partner-points-redeemed',
            loadChildren: () => import('@partner/partner-points-redeemed/partner-points-redeemed.module')
                .then(m => m.PartnerPointsRedeemedModule),
        },
        {
            path: 'partner-network',
            loadChildren: () => import('@partner/partner-network/partner-network.module')
                .then(m => m.PartnerNetworkModule),
        },
        {
            path: 'partner-exchange-tokens',
            loadChildren: () => import('@partner/partner-exchange-tokens/partner-exchange-tokens.module')
                .then(m => m.PartnerExchangeTokensModule),
        },
        {
            path: 'partner-members',
            loadChildren: () => import('@partner/partner-members/partner-members.module')
                .then(m => m.PartnerMembersModule),
        },
        {
            path: 'member-dashboard',
            loadChildren: () => import('@member/member-dashboard/member-dashboard.module')
                .then(m => m.MemberDashboardModule),
        },
        {
            path: 'member-earn-points',
            loadChildren: () => import('@member/member-earnpoints/member-earnpoints.module')
                .then(m => m.MemberEarnpointsModule),
        },
        {
            path: 'member-redeem-points',
            loadChildren: () => import('@member/member-redeempoints/member-redeempoints.module')
                .then(m => m.MemberRedeempointsModule),
        },
        {
            path: 'member-transactions',
            loadChildren: () => import('@member/member-transactions/member-transactions.module')
                .then(m => m.MemberTransactionsModule),
        },
        {
            path: 'member-exchange-tokens',
            loadChildren: () => import('@member/member-exchange-tokens/member-exchange-tokens.module')
                .then(m => m.MemberExchangeTokensModule),
        },
        {
            path: 'layout',
            loadChildren: () => import('./layout/layout.module')
                .then(m => m.LayoutModule),
        },
        {
            path: 'forms',
            loadChildren: () => import('./forms/forms.module')
                .then(m => m.FormsModule),
        },
        {
            path: 'ui-features',
            loadChildren: () => import('./ui-features/ui-features.module')
                .then(m => m.UiFeaturesModule),
        },
        {
            path: 'modal-overlays',
            loadChildren: () => import('./modal-overlays/modal-overlays.module')
                .then(m => m.ModalOverlaysModule),
        },
        {
            path: 'extra-components',
            loadChildren: () => import('./extra-components/extra-components.module')
                .then(m => m.ExtraComponentsModule),
        },
        {
            path: 'maps',
            loadChildren: () => import('./maps/maps.module')
                .then(m => m.MapsModule),
        },
        {
            path: 'charts',
            loadChildren: () => import('./charts/charts.module')
                .then(m => m.ChartsModule),
        },
        {
            path: 'editors',
            loadChildren: () => import('./editors/editors.module')
                .then(m => m.EditorsModule),
        },
        {
            path: 'tables',
            loadChildren: () => import('./tables/tables.module')
                .then(m => m.TablesModule),
        },
        {
            path: 'miscellaneous',
            loadChildren: () => import('./miscellaneous/miscellaneous.module')
                .then(m => m.MiscellaneousModule),
        },
        {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full',
        },
        {
            path: '**',
            component: NotFoundComponent,
        },
    ],
},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {
}
