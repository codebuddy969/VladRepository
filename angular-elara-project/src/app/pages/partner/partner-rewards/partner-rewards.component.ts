import {Component, OnInit, ViewChild, AfterViewInit, OnDestroy, ElementRef} from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {authService} from "@pages/service/authService";
import {NbToastrService} from "@nebular/theme";

@Component({
    selector: 'ngx-partner-rewards',
    templateUrl: './partner-rewards.component.html',
    styleUrls: ['./partner-rewards.component.scss']
})
export class PartnerRewardsComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('smartTable', {static: false}) smartTable;

    partnerRewards;
    source: LocalDataSource = new LocalDataSource();

    settings = {
        mode: 'external',
        actions: {add: true, edit: true, delete: true},
        add: {
            addButtonContent: '<i class="nb-plus"></i>',
            createButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
            confirmCreate: true,
        },
        edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
            confirmSave: true,
        },
        delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
            confirmDelete: true,
        },
        columns: {
            partner: {
                title: 'Partner',
                type: 'string',
                width: '33.3%'
            },
            item: {
                title: 'Item',
                type: 'string',
                width: '33.3%'
            },
            points: {
                title: 'Points',
                type: 'number',
                width: '33.3%'
            }
        },
        noDataMessage: "No data found"
    };

    constructor(private crudService: authService,
                private elementRef: ElementRef,
                public toastrService: NbToastrService,) {
    }

    ngOnInit() {
        this.settings.noDataMessage = "Loading data, please wait...";
        this.partnerRewards = JSON.parse(localStorage.getItem('partner'));
        this.crudService.postRequest("partnerData", this.partnerRewards).subscribe((response: any) => {
            if(response.addRewardResults) {
                this.source.load(response.addRewardResults);
            } else {
                this.settings.noDataMessage = "No data found";
            }
        });
    }

    ngAfterViewInit(): void {
        this.addCustomEventsToTable();
    }

    ngOnDestroy(): void {
        this.smartTable.edit.unsubscribe();
    }

    addCustomEventsToTable():void {
        this.smartTable.edit.subscribe((dataObject: any) => {
            dataObject.isInEditing = true;
        });
        const element = this.elementRef.nativeElement.querySelector('table');
        element.addEventListener('click', () => {
            !this.smartTable.grid.createFormShown ? this.smartTable.tableClass = '' : false;
        });
    }

    openCreateDialog(): void {
        this.smartTable.tableClass = 'hidden-filters';
        this.smartTable.grid.createFormShown = true;
    }

    onEditConfirm(event) {
        if (window.confirm('Are you sure you want to save?')) {
            event.confirm.resolve(event.newData);
        } else {
            event.confirm.reject();
        }
    }

    onCreateConfirm(event): void {
        const inputs = event.newData;
        const data = {
            cardId: inputs.partner,
            partnerId: inputs.partner,
            itemName: inputs.item,
            points: inputs.points
        };
        if (data.partnerId === '' ||
            data.points === '' ||
            data.itemName === '') {
            this.toastrService.show(
                "Please complete all fields",
                'Incomplete data',
                {status: "danger", duration: 5000}
            );
            return;
        }
        this.crudService.postRequest("addReward", data).subscribe((result: any) => {
            if (result.success) {
                event.confirm.resolve(event.newData);
                this.toastrService.show("Reward is added succesfully",'Reward added',{status: "success", duration: 5000});
            }
            if(result.error) {
                this.toastrService.show(result.error,'Error',{status: "danger", duration: 5000});
            }
            this.smartTable.tableClass = '';
        });
    }

    onDelete(event) {
        this.source.remove(event.data);
    }

}
