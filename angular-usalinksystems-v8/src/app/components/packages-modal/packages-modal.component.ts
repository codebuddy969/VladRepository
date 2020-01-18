import {
    Component,
    AfterViewInit,
    Renderer2,
    ViewChildren,
    QueryList,
    ElementRef,
    Input,
    Output,
    EventEmitter,
    ChangeDetectorRef,
    Inject,
    ViewChild
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Router} from '@angular/router';
import {CookieService} from 'angular2-cookie';

@Component({
    selector: 'app-packages-modal',
    templateUrl: './packages-modal.component.html',
    styleUrls: ['./packages-modal.component.scss'],
    providers: [CookieService]
})
export class PackagesModalComponent implements AfterViewInit {
    
    @Input() modalStatus: boolean;
    @Input() originalPrice: number = 0;
    @Input() packagePrice: number = 0;
    @Input() packageType: string;
    @Input() packageTime: string;
    @ViewChild('modal', {static: false}) modal: ElementRef;
    @ViewChildren('checkbox') checkbox: QueryList<ElementRef>;
    @Output() returnEvent = new EventEmitter<boolean>(true);
    
    public bodyscrollX: number;
    public bodyscrollY: number;
    
    public window: Window;
    public packages: any = {
        columnLeft: [
            {
                title: 'Social Media Management',
                price: '$450 a month',
                number: '450',
                option: 'social_media_managment',
                info: 'a month'
            }, {
                title: 'Logo Design - Advanced',
                price: '$1,200',
                number: '1200',
                option: 'logo_design_advanced'
            }, {
                title: 'Logo Design - Simple',
                price: '$400',
                number: '400',
                option: 'logo_design_simple'
            }, {
                title: 'Email Marketing',
                price: '$360 a month',
                number: '360',
                option: 'email_marketing',
                info: 'a month'
            }, {
                title: 'Video promotion',
                message: '*Price will be estimated separately based on specifications.',
                option: 'video_promotion',
                info: '*price will be estimated separately based on specifications.'
            }
        ],
        columnRight: [
            {
                title: 'Social Media Optimization',
                price: '$240 a month',
                number: '240',
                option: 'social_media_optimization',
                info: 'a month'
            }, {
                title: 'Landing Pages Creation',
                price: '$900 per landing page created',
                number: '900',
                option: 'landing_pages_creation',
                info: 'per landing page created'
            }, {
                title: 'Flyer Insert Creation',
                price: '$960 Per design',
                number: '960',
                option: 'flyer_insert_creation',
                info: 'per design'
            }, {
                title: 'Direct Mailing',
                price: '$710',
                number: '710',
                option: 'direct_mailing'
            }, {
                title: 'Pay-per-click Advertising',
                message: '*Price will be estimated separately based on specifications.',
                option: 'pay_per_click_advertising',
                info: '*price will be estimated separately based on specifications.'
            }
        ]
    };
    public collection: any = {
        type: '',
        price: 0,
        time: 0,
        options: {
            social_media_managment: null,
            logo_design_advanced: null,
            logo_design_simple: null,
            email_marketing: null,
            landing_pages_creation: null,
            flyer_insert_creation: null,
            direct_mailing: null,
            pay_per_click_advertising: null
        },
        originalPrice: 0
    };
    
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private renderer: Renderer2,
        private cookieService: CookieService,
        private router: Router,
        private cdRef: ChangeDetectorRef,
    ) {
        this.window = this.document.defaultView;
    }
    
    ngAfterViewInit(): void {
        this.checkInCookie();
        this.preventBodyFromScrolling(true);
        this.collection.originalPrice = this.originalPrice;
    }
    
    clickOnCheckbox(element: any): void {
        
        const element_title = element['getAttribute']('data-title');
        const element_price = element['getAttribute']('data-price') || 0;
        const element_option = element['getAttribute']('data-option');
        const element_info = element['getAttribute']('data-info');
        
        if (!element.classList.contains('active')) {
            this.packagePrice = element_price != null ? this.packagePrice + parseInt(element_price, 10) : this.packagePrice;
            this.renderer.addClass(element, 'active');
            this.collection.options[element_option] = {
                title: element_title,
                price: element_price,
                info: element_info
            };
        } else {
            this.packagePrice = element_price != null ? this.packagePrice - parseInt(element_price, 10) : this.packagePrice;
            this.renderer.removeClass(element, 'active');
            this.collection.options[element_option] = null;
        }
    }
    
    confirmPackage(): void {
        this.collection.type = this.packageType;
        this.collection.price = this.packagePrice;
        this.collection.time = this.packageTime;
        this.cookieService.putObject('collection', this.collection);
        this.router.navigate(['/confirm-package']);
    }
    
    abortOptions(): void {
        this.collection.type = this.packageType;
        this.collection.price = this.collection.originalPrice;
        this.collection.time = this.packageTime;
        this.collection.options = {};
        this.cookieService.remove('collection');
        this.cookieService.putObject('collection', this.collection);
        this.router.navigate(['/confirm-package']);
    }
    
    checkInCookie(): void {
        const rootClass: any = this;
        const cookieData: any = this.cookieService.getObject('collection');
        if (this.checkbox && cookieData) {
            this.checkbox.forEach((element: ElementRef) => {
                
                const element_title = element.nativeElement['getAttribute']('data-title');
                const element_price = element.nativeElement['getAttribute']('data-price') || 0;
                const element_option = element.nativeElement['getAttribute']('data-option');
                const element_info = element.nativeElement['getAttribute']('data-info');
                
                Object.keys(cookieData.options).forEach(function(key: string): void {
                    const val = cookieData.options[key];
                    if (val != null && key === element_option) {
                        rootClass.renderer.setElementClass(element.nativeElement, 'active', true);
                        rootClass.collection.options[element_option] = {
                            title: element_title,
                            price: element_price,
                            info: element_info
                        };
                        rootClass.cdRef.detectChanges();
                    }
                });
            });
        }
    }
    
    closeModal(event): void {
        this.checkbox.forEach((row: ElementRef) => {
            this.renderer.removeClass(row.nativeElement, 'active');
        });
        this.returnEvent.emit(false);
        this.preventBodyFromScrolling(false);
    }
    
    preventBodyFromScrolling(status: boolean): void {
        if (status) {
            this.bodyscrollX = this.window.scrollX;
            this.bodyscrollY = this.window.scrollY;
            this.renderer.addClass(this.document.body, 'block-scroll');
            this.renderer.setStyle(this.document.body, 'top', -this.bodyscrollY.toString() + 'px');
        } else {
            this.renderer.removeClass(this.document.body, 'block-scroll');
            this.window.scrollBy(this.bodyscrollX, this.bodyscrollY);
        }
    }
}
