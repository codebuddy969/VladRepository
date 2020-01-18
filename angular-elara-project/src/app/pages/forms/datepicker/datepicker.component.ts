import { Component } from '@angular/core';
import { NbDateService } from '@nebular/theme';
import {authService} from "../../service/authService";
import {LocalDataSource} from "ng2-smart-table";
import {SmartTableData} from "../../../@core/data/smart-table";

@Component({
  selector: 'ngx-datepicker',
  templateUrl: 'datepicker.component.html',
  styleUrls: ['datepicker.component.scss'],
})
export class DatepickerComponent {

  memberRewards;
  memberData;
  selectoptionData;
  loyaltyProgramDeal;
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

    this.memberRewards = JSON.parse(localStorage.getItem('member'));
      this.crudService.memberData(this.memberRewards).subscribe((result: any) => {
        if (result) {
          this.memberData = result;
        }
      });
  }
  onChange(value) {
    this.error = '';
    this.selectoptionData = {
      'partnerId': value.id,
      'cardId': this.memberRewards.cardid,
    };

    this.crudService.memberRewardsPonts(this.selectoptionData).subscribe((result: any) => {
      if (result) {
        this.loyaltyProgramDeal = result;
      }
    });
  }
  usePoints(usePoints) {
    const inputData = {
      'accountnumber' : this.memberRewards.accountnumber,
      'cardid' : this.memberRewards.cardid,
      'points' : usePoints.points ,
      'partnerid' : usePoints.partner,
    };
    this.crudService.memberUseRewardPoints(inputData).subscribe((result: any) => {
      if (result) {
       alert('Transaction Successfully');
      }
    });
  }
  pointearn(value) {
    if (this.selectoptionData) {
      const inputData = {
        'accountnumber' : this.memberRewards.accountnumber,
        'cardid' : this.memberRewards.cardid,
        'points' : value ,
        'partnerid' : this.selectoptionData.partnerId,
      };
      this.crudService.memberUseRewardPoints(inputData).subscribe((result: any) => {
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
}
