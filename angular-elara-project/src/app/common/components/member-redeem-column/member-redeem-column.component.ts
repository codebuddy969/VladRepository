import {Component, Input, OnInit} from '@angular/core';
import {ViewCell} from "ng2-smart-table";
import {authService} from "@pages/service/authService";
import {NbToastrService} from "@nebular/theme";

@Component({
    selector: 'ngx-member-redeem-column',
    templateUrl: './member-redeem-column.component.html',
    styleUrls: ['./member-redeem-column.component.scss']
})
export class MemberRedeemColumnComponent implements ViewCell, OnInit {

    memberInfo;
    @Input() value;
    @Input() rowData: any;

    constructor(private crudService: authService, public toastrService: NbToastrService) {
    }

    ngOnInit(): void {
        this.memberInfo = JSON.parse(localStorage.getItem('member'));
    }

    transactionRequest() {
        const data = {
            accountnumber: this.memberInfo.accountnumber,
            cardid: this.memberInfo.cardid,
            partnerid: this.value.partner,
            points: this.value.points
        }

        console.log(this.value);
        this.crudService.postRequest("usePoints", data).subscribe((response: any) => {
            if(response.success) {
                this.toastrService.show(response.error,'Successful transaction',{status: "success", duration: 5000});
            } else {
                this.toastrService.show(response.error,'Transaction failed',{status: "danger", duration: 5000});
            }
        });
    }
}
