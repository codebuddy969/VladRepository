import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {MemberTransactionsComponent} from './member-transactions.component';
import {NbCardModule} from '@nebular/theme';
import {Ng2SmartTableModule} from "ng2-smart-table";

const routes: Routes = [{
    path: '',
    component: MemberTransactionsComponent
}];

@NgModule({
    declarations: [MemberTransactionsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NbCardModule,
        Ng2SmartTableModule,
    ],
    exports: [RouterModule],
})
export class MemberTransactionsModule {
}
