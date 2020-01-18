import {Component, OnInit, ViewChild, AfterViewInit, OnDestroy, ElementRef} from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {authService} from "@pages/service/authService";
import {NbToastrService} from "@nebular/theme";

@Component({
    selector: 'ngx-partner-members',
    templateUrl: './partner-members.component.html',
    styleUrls: ['./partner-members.component.scss']
})
export class PartnerMembersComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('smartTable', {static: false}) smartTable;

    partnerOffer;
    settings = {
        mode: 'external',
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
            id: {
                title: 'ID',
                type: 'number',
            },
            first_name: {
                title: 'First Name',
                type: 'string',
            },
            last_name: {
                title: 'Last Name',
                type: 'string',
            },
            username: {
                title: 'Username',
                type: 'string',
            },
            email: {
                title: 'E-mail',
                type: 'string',
            },
            age: {
                title: 'Age',
                type: 'number',
            }
        },
        noDataMessage: "No data found"
    };

    data = [
        {
            id: '1',
            first_name: 'First Name 1',
            last_name: 'Last Name 1',
            username: 'Universal Name 1',
            email: 'test@test.com',
            age: '35'
        },{
            id: '2',
            first_name: 'First Name 2',
            last_name: 'Last Name 2',
            username: 'Universal Name 2',
            email: 'test@test.com',
            age: '35'
        },
    ];

    source: LocalDataSource = new LocalDataSource();

    constructor(private crudService: authService,
                private elementRef: ElementRef,
                public toastrService: NbToastrService,) {
    }

    ngOnInit() {
        this.settings.noDataMessage = "Loading data, please wait...";
        this.source.load(this.data);
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

    onCreateConfirm(event):void {
        if (window.confirm('Are you sure you want to create?')) {
            event.confirm.resolve(event.newData);
        } else {
            event.confirm.reject();
        }
    }

    onDelete(event) {
        this.source.remove(event.data);
    }
}
