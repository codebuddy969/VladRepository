import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {authService} from "@pages/service/authService";
import {MemberRedeemColumnComponent} from "@commonComponents/member-redeem-column/member-redeem-column.component";

@Component({
    selector: 'ngx-member-redeempoints',
    templateUrl: './member-redeempoints.component.html',
    styleUrls: ['./member-redeempoints.component.scss']
})
export class MemberRedeempointsComponent implements OnInit {

    tableStatus = false;
    source: LocalDataSource = new LocalDataSource();

    settings = {
        actions: {add: false, edit: false, delete: false},
        columns: {
            item: {
                title: 'Item',
                type: 'string',
                width: '46%'
            },
            partner: {
                title: 'Partner',
                type: 'date',
                width: '15%'
            },
            points: {
                title: 'Points',
                type: 'number',
                width: '15%',
            },
            redeem: {
                title: 'Redeem',
                type: 'custom',
                filter: false,
                sortable: false,
                width: '8%',
                renderComponent: MemberRedeemColumnComponent,
                valuePrepareFunction: (cell, row) => row
            },
            qrcode: {
                title: 'QR Code',
                type: 'html',
                filter: false,
                sortable: false,
                width: '8%',
                valuePrepareFunction: () => {
                    return '<span class="test-icon"><i class="ion-archive"></i></span>';
                },
            },
            Info: {
                title: 'Info',
                type: 'html',
                filter: false,
                sortable: false,
                width: '8%',
                valuePrepareFunction: () => {
                    return '<span class="test-icon"><i class="ion-archive"></i></span>';
                },
            }
        },
        noDataMessage: "Loading data, please wait..."
    };

    data = [
        {
            redemption: 'Two tickets to see the Who on the Lawn',
            dates: '09/01-12-31',
            category: 'Music',
            location: 'Madison,WI',
            points: '5000'
        },{
            redemption: 'La Dolce Vita: Ultimate Rome Experience',
            dates: '09/01-12-31',
            category: 'Culture',
            location: 'Italy',
            points: '10000'
        },{
            redemption: 'Unforgettable Dinner Experience in Athens',
            dates: '09/01-12-31',
            category: 'Food',
            location: 'Greece',
            points: '15000'
        },{
            redemption: 'Iron Maden Concert Tickets',
            dates: '01/01-12-31',
            category: 'Music',
            location: 'Las Vegas, NV',
            points: '10000'
        },{
            redemption: '10% off Hertz economy car rental',
            dates: '09/01-12-31',
            category: 'Car Rental',
            location: 'Americas',
            points: '15000'
        },{
            redemption: 'Donate to Childrens Hospital',
            dates: '01/01-12-31',
            category: 'Charity',
            location: 'Boston, MA',
            points: '20000'
        },{
            redemption: 'Donate to environmental organization',
            dates: '09/01-12-31',
            category: 'Charity',
            location: 'Los Angeles, CA',
            points: '10000'
        }
    ];

    constructor(private crudService: authService) {
    }

    ngOnInit() {
        this.crudService.postRequest("allRewardsInfo", {cardId: "admin"}).subscribe((response: any) => {
            if(response.success.length > 0) {
                this.source.load(response.success);
            } else {
                this.settings.noDataMessage = "No data found";
            }
            this.tableStatus = true;
        });
    }

}
