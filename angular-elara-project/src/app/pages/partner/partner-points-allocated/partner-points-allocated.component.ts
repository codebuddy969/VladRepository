import {Component, OnInit} from '@angular/core';
import {authService} from "@pages/service/authService";
import {LocalDataSource} from "ng2-smart-table";
import {DatePipe} from "@angular/common";

@Component({
    selector: 'ngx-partner-points-allocated',
    templateUrl: './partner-points-allocated.component.html',
    styleUrls: ['./partner-points-allocated.component.scss']
})
export class PartnerPointsAllocatedComponent implements OnInit {

    partnerAllocated;
    tableStatus = false;
    datePipeEn: DatePipe = new DatePipe('en-US');
    source: LocalDataSource = new LocalDataSource();

    settings = {
        actions: {add: false, edit: false, delete: false},
        columns: {
            transactionId: {
                title: 'Transaction ID',
                type: 'string',
                width: '20%'
            },
            timestamp: {
                title: 'Time Stamp',
                type: 'string',
                width: '20%',
                valuePrepareFunction: (date) => {
                    return date ? this.datePipeEn.transform(date, 'dd-MM-yyyy hh:mm') : null;
                }
            },
            member: {
                title: 'Member ID',
                type: 'string',
                width: '20%'
            },
            partner: {
                title: 'Partner ID',
                type: 'string',
                width: '20%'
            },
            points: {
                title: 'Points',
                type: 'string',
                width: '20%'
            }
        },
        noDataMessage: "Loading data, please wait..."
    };

    constructor(private crudService: authService) {
    }

    ngOnInit() {
        this.partnerAllocated = JSON.parse(localStorage.getItem('partner'));
        this.crudService.postRequest("partnerData", this.partnerAllocated).subscribe((response: any) => {
            if(Array.isArray(response.earnPointsResults) && response.earnPointsResults.length > 0) {
                this.source.load(response.earnPointsResults);
            } else {
                this.settings.noDataMessage = "No data found";
            }
            this.tableStatus = true;
        });
    }

    onEditConfirm(event) {
        if (window.confirm('Are you sure you want to save?')) {
            event.confirm.resolve(event.newData);
        } else {
            event.confirm.reject();
        }
    }

    onCreateConfirm(event):void {
        const inputs = event.newData;
        const data = {
            cardId: inputs.partner,
            partnerId: inputs.partner,
            itemName: inputs.item,
            points: inputs.points
        };
        this.crudService.postRequest("addReward", data).subscribe((result: any) => {
            if (result.success) {
                event.confirm.resolve(event.newData);
            }
        });
    }

}
