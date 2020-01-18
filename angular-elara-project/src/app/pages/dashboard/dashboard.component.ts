import {Component, OnDestroy} from '@angular/core';
import {NbThemeService} from '@nebular/theme';
import {takeWhile} from 'rxjs/operators' ;
import {SolarData} from '../../@core/data/solar';
import {LocalDataSource} from "ng2-smart-table";
import {OfferData} from "../../@core/data/offerdata";
import {authService} from "../service/authService";

interface CardSettings {
    title: string;
    iconClass: string;
    type: string;
}

@Component({
    selector: 'ngx-dashboard',
    styleUrls: ['./dashboard.component.scss'],
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {

    private alive = true;

    solarValue: number;
    lightCard: CardSettings = {
        title: 'Light',
        iconClass: 'nb-lightbulb',
        type: 'primary',
    };
    rollerShadesCard: CardSettings = {
        title: 'Roller Shades',
        iconClass: 'nb-roller-shades',
        type: 'success',
    };
    wirelessAudioCard: CardSettings = {
        title: 'Wireless Audio',
        iconClass: 'nb-audio',
        type: 'info',
    };
    coffeeMakerCard: CardSettings = {
        title: 'Coffee Maker',
        iconClass: 'nb-coffee-maker',
        type: 'warning',
    };

    statusCards: string;

    commonStatusCardsSet: CardSettings[] = [
        this.lightCard,
        this.rollerShadesCard,
        this.wirelessAudioCard,
        this.coffeeMakerCard,
    ];

    statusCardsByThemes: {
        default: CardSettings[];
        cosmic: CardSettings[];
        corporate: CardSettings[];
        dark: CardSettings[];
    } = {
        default: this.commonStatusCardsSet,
        cosmic: this.commonStatusCardsSet,
        corporate: [
            {
                ...this.lightCard,
                type: 'warning',
            },
            {
                ...this.rollerShadesCard,
                type: 'primary',
            },
            {
                ...this.wirelessAudioCard,
                type: 'danger',
            },
            {
                ...this.coffeeMakerCard,
                type: 'info',
            },
        ],
        dark: this.commonStatusCardsSet,
    };

    settings = {
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
            },
            /*      offer: {
                    title: 'OFFER',
                    type: 'string',
                  },
                  dates: {
                    title: 'Dates',
                    type: 'string',
                  },
                  membershipleval: {
                    title: 'Membership Leval',
                    type: 'string',
                  },
                  points: {
                    title: 'Points',
                    type: 'string',
                  },*/
        },
    };

    source: LocalDataSource = new LocalDataSource();

    constructor(private themeService: NbThemeService,
                private solarService: SolarData,
                private crudservice: authService) {
        this.themeService.getJsTheme()
            .pipe(takeWhile(() => this.alive))
            .subscribe(theme => {
                this.statusCards = this.statusCardsByThemes[theme.name];
            });

        this.solarService.getSolarData()
            .pipe(takeWhile(() => this.alive))
            .subscribe((data) => {
                this.solarValue = data;
            });
        const partnerTransaction = JSON.parse(localStorage.getItem('partner'));
        this.crudservice.partnerData(partnerTransaction).subscribe((result: any) => {
            if (result) {
                console.log('partnerTransactionData', result);
                this.source.load(result.addOfferResults);
            }
        });

        /*    const temp = JSON.parse(localStorage.getItem('data'));
            const data = temp.addOfferResults;
            this.source.load(data);*/
    }

    ngOnDestroy() {
        this.alive = false;
    }

    onDeleteConfirm(event): void {
        if (window.confirm('Are you sure you want to delete?')) {
            event.confirm.resolve();
        } else {
            event.confirm.reject();
        }
    }
}
