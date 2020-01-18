import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import {SmartTableData} from '../../../@core/data/smart-table';
import {TransactionDataService} from "../../../@core/mock/transactionDataService";
import {authService} from "../../service/authService";

@Component({
  selector: 'ngx-tooltip',
  templateUrl: 'tooltip.component.html',
  styleUrls: ['tooltip.component.scss'],
})
export class TooltipComponent {
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
      transactionId: {
        title: 'Transaction ID',
        type: 'string',
      },
      timestamp: {
        title: 'Time Stamp',
        type: 'string',
      },
      member: {
        title: 'Member ID',
        type: 'string',
      },
      partner: {
        title: 'Partner ID',
        type: 'string',
      },
      points: {
        title: 'Points',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private crudservice: authService) {

    const partnerTransaction = JSON.parse(localStorage.getItem('partner'));
    this.crudservice.partnerData(partnerTransaction).subscribe((result: any) => {
      if (result) {
        console.log('partnerTransactionData', result);
        this.source.load(result.earnPointsResults);
      }
    });

    // const temp = JSON.parse(localStorage.getItem('data'));
    // const data = temp.usePointsResults;


  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
