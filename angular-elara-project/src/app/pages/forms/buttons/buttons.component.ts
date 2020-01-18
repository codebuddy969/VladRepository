import { Component } from '@angular/core';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';
import {authService} from '../../service/authService';
import {LocalDataSource} from "ng2-smart-table";
import {SmartTableData} from "../../../@core/data/smart-table";

@Component({
  selector: 'ngx-buttons',
  styleUrls: ['./buttons.component.scss'],
  templateUrl: './buttons.component.html',
})
export class ButtonsComponent {
  memberData;
  memberTransaction;
  purchaseDeals;
  accountPartnerId = 0;
  selectoptionData;
  error;

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      firstName: {
        title: 'Redemption',
        type: 'string',
      },
      lastName: {
        title: 'Dates',
        type: 'string',
      },
      username: {
        title: 'Category',
        type: 'string',
      },
      email: {
        title: 'Location',
        type: 'string',
      },
      age: {
        title: 'Points',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private crudService: authService, private tableService: SmartTableData) {
    const data = this.tableService.getData();
    this.source.load(data);

    this.memberTransaction = JSON.parse(localStorage.getItem('member'));
    this.crudService.memberData(this.memberTransaction).subscribe((result: any) => {
      console.log(result)
      if (result) {
       this.memberData = result;
      }
    });
  }
  onChange(value) {
    this.error = '';
    this.selectoptionData = {
      'partnerId': value.id,
      'cardId': this.memberTransaction.cardid,
    };
    this.crudService.memberAddOfferTransaction(this.selectoptionData).subscribe((result: any) => {
      if (result) {
        this.purchaseDeals = result;
      }
    });
  }
  earnPoints(purchase) {
    const inputData = {
      'accountnumber' : this.memberTransaction.accountnumber,
      'cardid' : this.memberTransaction.cardid,
      'points' : purchase.points ,
      'partnerid' : purchase.partner,
    };
    this.crudService.memberEarnPoints(inputData).subscribe((result: any) => {
      if (result) {
        alert('Transaction Successfully');
      }
    });
  }
  pointearn(value) {
    if (this.selectoptionData) {
      const inputData = {
        'accountnumber': this.memberTransaction.accountnumber,
        'cardid': this.memberTransaction.cardid,
        'points': value,
        'partnerid': this.selectoptionData.partnerId,
      };
      this.crudService.memberEarnPoints(inputData).subscribe((result: any) => {
        if (result) {
          alert('Transaction Successfully');
        }
      });
    } else {
      this.error = 'Select partner first';
    }
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
/*  statuses: NbComponentStatus[] = [ 'primary', 'success', 'info', 'warning', 'danger' ];
  shapes: NbComponentShape[] = [ 'rectangle', 'semi-round', 'round' ];
  sizes: NbComponentSize[] = [ 'tiny', 'small', 'medium', 'large', 'giant' ];*/
}
