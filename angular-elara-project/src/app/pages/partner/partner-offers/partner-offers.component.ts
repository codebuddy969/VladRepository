import {Component, OnInit, ViewChild, AfterViewInit, OnDestroy, ElementRef} from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {authService} from "@pages/service/authService";
import {NbToastrService} from "@nebular/theme";

@Component({
    selector: 'ngx-partner-offers',
    templateUrl: './partner-offers.component.html',
    styleUrls: ['./partner-offers.component.scss']
})
export class PartnerOffersComponent implements OnInit, AfterViewInit, OnDestroy {

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
            partner: {
                title: 'Partner',
                type: 'string',
            },
            price: {
                title: 'Price',
                type: 'string',
            },
            product: {
                title: 'Product',
                type: 'string',
            },
            points: {
                title: 'Points',
                type: 'string',
            }
        },
        noDataMessage: "No data found"
    };

    source: LocalDataSource = new LocalDataSource();

    constructor(private crudService: authService,
                private elementRef: ElementRef,
                public toastrService: NbToastrService,) {
    }

    ngOnInit() {
        this.settings.noDataMessage = "Loading data, please wait...";
        this.partnerOffer = JSON.parse(localStorage.getItem('partner'));
        this.crudService.postRequest("partnerData", this.partnerOffer).subscribe((result: any) => {
            if (result.addOfferResults) {
                this.source.load(result.addOfferResults);
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

    onEditConfirm(event): void {
        if (window.confirm('Are you sure you want to save?')) {
            event.confirm.resolve(event.newData);
        } else {
            event.confirm.reject();
        }
    }

    onCreateConfirm(event): void {
        console.log(event);
        const inputs = event.newData;
        const data = {
            cardId: inputs.partner,
            partnerId: inputs.partner,
            points: inputs.points,
            price: inputs.price,
            productName: inputs.product,
        };
        if (data.partnerId === '' ||
            data.points === '' ||
            data.price === '' ||
            data.productName === '') {
            this.toastrService.show(
                "Please complete all fields",
                'Incomplete data',
                {status: "danger", duration: 5000}
            );
            return;
        }
        this.crudService.postRequest("addOffer", data).subscribe((result: any) => {
            if (result.success) {
                event.confirm.resolve(event.newData);
                this.toastrService.show("Offer is added succesfully",'Offer added',{status: "success", duration: 5000});
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
