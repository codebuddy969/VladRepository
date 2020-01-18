import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                loadChildren: () => import('@modules/home-page/home-page.module').then(mod => mod.HomeModule)
            },
            {
                path: 'subscribe',
                loadChildren: () => import('@modules/home-page/home-page.module').then(mod => mod.HomeModule)
            },
            {
                path: 'unsubscribe',
                loadChildren: () => import('@modules/home-page/home-page.module').then(mod => mod.HomeModule)
            }
        ]
    },{
        path: 'who-we-are',
        loadChildren: () => import('@modules/who-we-are/who-we-are.module').then(mod => mod.WhoWeAreModule)
    }, {
        path: 'our-work',
        loadChildren: () => import('@modules/our-work/our-work.module').then(mod => mod.OurWorkModule)
    }, {
        path: 'platon-profile',
        loadChildren: () => import('@modules/platon-page/platon-page.module').then(mod => mod.PlatonPageModule)
    }, {
        path: 'join-us',
        loadChildren: () => import('@modules/join-us/join-us.module').then(mod => mod.JoinUsModule)
    }, {
        path: 'packages',
        loadChildren: () => import('@modules/packages/packages.module').then(mod => mod.PackagesModule)
    }, {
        path: 'confirm-package',
        loadChildren: () => import('@modules/package-confirmation/package-confirmation.module').then(mod => mod.PackageConfirmationModule)
    }, {
        path: 'subcontractor',
        loadChildren: () => import('@modules/subcontractor/subcontractor.module').then(mod => mod.SubcontractorModule)
    }, {
        path: 'start-up',
        loadChildren: () => import('@modules/start-up/start-up.module').then(mod => mod.StartUpModule)
    }, {
        path: 'partnership',
        loadChildren: () => import('@modules/partnership/partnership.module').then(mod => mod.PartnershipModule)
    }, {
        path: 'non-profit',
        loadChildren: () => import('@modules/non-profit/non-profit.module').then(mod => mod.NonProfitModule)
    }, {
        path: 'whats-new',
        children: [
            {
                path: '',
                loadChildren: () => import('@modules/whats-new/whats-new.module').then(mod => mod.WhatsNewModule)
            },
            {
                path: 'blog',
                loadChildren: () => import('@modules/all-blogs/all-blogs.module').then(mod => mod.AllBlogsModule)
            },
            {
                path: 'details/:id',
                loadChildren: () => import('@modules/single-post/single-post.module').then(mod => mod.SinglePostModule)
            },
            {
                path: 'events',
                loadChildren: () => import('@modules/all-events/all-events.module').then(mod => mod.AllEventsModule)
            },
        ]
    }, {
        path: 'lets-talk',
        loadChildren: () => import('@modules/lets-talk/lets-talk.module').then(mod => mod.LetsTalkModule)
    }, {
        path: 'services/:name',
        loadChildren: () => import('@modules/single-service/single-service.module').then(mod => mod.SingleServiceModule)
    }, {
        path: 'vlogs-page',
        loadChildren: () => import('@modules/all-vlogs/all-vlogs.module').then(mod => mod.AllVlogsModule)
    }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class PagesModule {
}
