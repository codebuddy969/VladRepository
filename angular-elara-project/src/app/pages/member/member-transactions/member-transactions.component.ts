import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {authService} from "@pages/service/authService";
import {LocalDataSource} from "ng2-smart-table";

@Component({
    selector: 'ngx-member-transactions',
    templateUrl: './member-transactions.component.html',
    styleUrls: ['./member-transactions.component.scss']
})
export class MemberTransactionsComponent implements OnInit {

    memberTransaction;
    datePipeEn: DatePipe = new DatePipe('en-US');
    source: LocalDataSource = new LocalDataSource();

    settings = {
        actions: {add: false, edit: false, delete: false},
        columns: {
            member: {
                title: 'Member',
                type: 'string',
                width: '20%'
            },
            partner: {
                title: 'Partner',
                type: 'string',
                width: '20%'
            },
            points: {
                title: 'Points',
                type: 'number',
                width: '20%'
            },
            transactionId: {
                title: 'Transaction ID',
                type: 'number',
                width: '20%'
            },
            timestamp: {
                title: 'Date',
                type: 'date',
                width: '20%',
                valuePrepareFunction: (date) => {
                    return date ? this.datePipeEn.transform(date, 'dd-MM-yyyy hh:mm') : null;
                },
            }
        },
        noDataMessage: "No data found"
    };

    constructor(private crudService: authService) {
    }

    ngOnInit(): void {
        this.settings.noDataMessage = "Loading data, please wait...";
        this.memberTransaction = JSON.parse(localStorage.getItem('member'));
        this.crudService.postRequest("memberData", this.memberTransaction).subscribe((response: any) => {
            if (response.earnPointsResult) {
                this.source.load(response.earnPointsResult);
            } else {
                this.settings.noDataMessage = "No data found";
            }
        });
    }
}
