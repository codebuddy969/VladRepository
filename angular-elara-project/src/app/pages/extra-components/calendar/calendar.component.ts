import { Component } from '@angular/core';
import { NbCalendarRange, NbDateService } from '@nebular/theme';
import { DayCellComponent } from './day-cell/day-cell.component';
import {LocalDataSource} from "ng2-smart-table";
import {authService} from "../../service/authService";

@Component({
  selector: 'ngx-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.scss'],
  entryComponents: [DayCellComponent],
})
export class CalendarComponent {
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

/*  date = new Date();
  date2 = new Date();
  range: NbCalendarRange<Date>;
  dayCellComponent = DayCellComponent;*/
  source: LocalDataSource = new LocalDataSource();

  constructor(private crudservice: authService) {
    const partnerTransaction = JSON.parse(localStorage.getItem('partner'));
    this.crudservice.partnerData(partnerTransaction).subscribe((result: any) => {
      if (result) {
        console.log('partnerTransactionData', result);
        this.source.load(result.usePointsResults);
      }
    });
/*    protected dateService: NbDateService<Date>
this.range = {
      start: this.dateService.addDay(this.monthStart, 3),
      end: this.dateService.addDay(this.monthEnd, -3),
    };*/
  }

/*  get monthStart(): Date {
    return this.dateService.getMonthStart(new Date());
  }

  get monthEnd(): Date {
    return this.dateService.getMonthEnd(new Date());
  }*/
}
