import {Component, OnInit} from '@angular/core';
import {authService} from "@pages/service/authService";
import {LocalDataSource} from "ng2-smart-table";
import {MemberEarnpointsButtonComponent} from "@commonComponents/member-earnpoints-button/member-earnpoints-button.component";

@Component({
    selector: 'ngx-member-earnpoints',
    templateUrl: './member-earnpoints.component.html',
    styleUrls: ['./member-earnpoints.component.scss']
})
export class MemberEarnpointsComponent implements OnInit {

    source: LocalDataSource = new LocalDataSource();

    settings = {
        actions: {add: false, edit: false, delete: false},
        columns: {
            partner: {
                title: 'Partner',
                type: 'string',
                width: '25%'
            },
            product: {
                title: 'Product',
                type: 'string',
                width: '25%'
            },
            price: {
                title: 'Price',
                type: 'string',
                width: '25%'
            },
            points: {
                title: 'Points',
                type: 'number',
                width: '25%'
            },
            purchase: {
                title: 'Buy',
                type: 'custom',
                width: '10%',
                filter: false,
                sortable: false,
                renderComponent: MemberEarnpointsButtonComponent,
                valuePrepareFunction: (cell, row) => row
            },
        },
        noDataMessage: "No data found"
    };

    constructor(private crudService: authService) {
    }

    ngOnInit(): void {
        this.settings.noDataMessage = "Loading data, please wait...";
        this.crudService.postRequest("allOffersInfo", {cardId: "admin"}).subscribe((response: any) => {
            if(response.success) {
                this.source.load(response.success);
            }
        });
    }
}
