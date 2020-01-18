import {Component, AfterViewInit, HostListener, Inject} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {MetaService} from '@app/shared';
import {CookieService} from 'angular2-cookie';
import {DOCUMENT} from '@angular/common';
import Swiper from 'swiper';

@Component({
    selector: 'app-packages',
    templateUrl: './packages.component.html',
    styleUrls: ['./packages.component.scss'],
    providers: [CookieService]
})
export class PackagesComponent implements AfterViewInit {
    
    private window: Window;
    public packageType: string;
    public packageTime: number;
    public packagePrice: number = 0;
    public originalPrice: number = 0;
    public modalStatus: boolean = false;
    public showSoniaModal: boolean = false;
    public swiperPrev: string = 'Basic';
    public swiperNext: string = 'Advanced';
    public action: boolean = false;
    public messageData: Object = {};
    public services = [
        {
            title: 'Social Media Optimization',
            description: 'Option is an addition to whichever package is selected above. Includes management of social media ads and post promotions such as optimization including but not limited to directions/suggestions or adjustment of targeted audience.',
            price: '$240',
            info: 'A month'
        },{
            class: true,
            title: 'Social Media Management',
            description: 'One social media post published per day on all of the decided upon social media outlets. (Facebook, Instagram, Twitter, etc.)',
            price: '$450',
            info: 'A month'
        },{
            title: 'Logo Design - Advanced',
            description: 'Creation of 3 sample logos. Up to 3 permitted revision requests thereafter, any and all additional requested changes will be priced at the regular design rate of $120/HR.',
            price: '$1200'
        },{
            class: true,
            title: 'Logo Design - Simple',
            description: 'Creation of 1 sample logo. Up to 1 permitted revision request, any and all additional requested changes will be priced at the regular design rate of $120/HR.',
            price: '$400'
        },{
            title: 'Pay-per-click Advertising',
            description: 'PPC, or Pay Per Click, is simple: Search engines like Google and Bing allow businesses and individuals to buy listings in their search results. These listings appear alongside, and increasingly above the non-paid organic search results. The search engine is then paid every time a user clicks on the sponsored listing.',
            message: '*Price will be estimated separately based on specifications.'
        },{
            class: true,
            title: 'Landing Pages Creation',
            description: 'Creation of 1 flat landing page with no extra functionalities. Landing pages lead prospective clients to your website all while collecting user information that could allow for future marketing possibilities.',
            price: '$900',
            info: 'per landing page created'
        },{
            title: 'Flyer Insert Creation',
            description: 'Flyer cannot be more than 8 ½ by 11 inches in size. Anything more will be charged at the rate of $120/HR and will require a custom quote. For example, a booklet for a product.',
            price: '$960',
            info: 'per design'
        },{
            class: true,
            title: 'Direct Mailing',
            description: 'Depending on amount and style chosen, does not include cost of postage. Labor cost – 2500 flyers',
            price: '$710'
        },{
            title: 'Email Marketing',
            description: 'Excludes email design – priced at $960 per design needed.',
            price: '$360',
            info: 'A month'
        },{
            class: true,
            title: 'Video Promotion',
            description: 'Combine your brand’s business info into an interactive video that can be placed on your website and/or shared amongst social media websites.',
            message: '*Price will be estimated separately based on specifications.'
        }
    ];
    public packagesSwiper: Swiper;
    
    constructor (
        @Inject(DOCUMENT) private document: Document,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private cookieService: CookieService,
        private metaService: MetaService
    ) { this.window = this.document.defaultView; }
    
    ngAfterViewInit(): void {
        this.initPackagesSwiper();
        this.metaService.addMetaTags({
            title: this.activatedRoute.snapshot.data.meta['title'],
            description: this.activatedRoute.snapshot.data.meta['description'],
            keywords: this.activatedRoute.snapshot.data.meta['keywords']
        });
        this.activatedRoute.params.subscribe((params: any) => {
            if (params.options === 'options') {
                const cookieData: any = this.cookieService.getObject('collection');
                this.packagePrice = cookieData.price;
                this.originalPrice = cookieData.originalPrice;
                this.packageType = cookieData.type;
                this.packageTime = cookieData.time;
                this.modalStatus = true;
            }
        });
    }
    
    @HostListener('click', ['$event']) onClick(event: any): void {
        if (event.target.className === 'pck-card__button') {
            const price = event.target['getAttribute']('data-price');
            const type = event.target['getAttribute']('data-type');
            const time = event.target['getAttribute']('data-time');
            this.openPackagesModal(parseInt(price, 10), type, parseInt(time, 10));
        }
    }
    
    initPackagesSwiper(): void {
        const opts = {
            slidesPerView: 3,
            spaceBetween: 35,
            noSwiping: true,
            simulateTouch: false,
            prevButton: '.swiper-button-prev',
            nextButton: '.swiper-button-next',
            loop: true,
            breakpoints: {
                575: {
                    slidesPerView: 3,
                    spaceBetween: 0
                },
                991: {
                    initialSlide: 1,
                    slidesPerView: 1,
                    spaceBetween: 0,
                    speed: 1000,
                    autoplay: 4000
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 15
                }
            },
            onSlideChangeStart: (e) => {
                let active: number = e.activeIndex;
                switch (active) {
                    case 0:
                    case 3:
                        this.swiperPrev = 'Most popular';
                        this.swiperNext = 'Basic'
                        break;
                    case 1:
                    case 4:
                        this.swiperPrev = 'Advanced';
                        this.swiperNext = 'Most popular'
                        break;
                    case 2:
                        this.swiperPrev = 'Basic';
                        this.swiperNext = 'Advanced'
                        break;
                    default:
                        this.swiperPrev = 'Prev';
                        this.swiperNext = 'Next';
                }
            }
        };
        this.packagesSwiper = new Swiper('.swiper-container', opts);
    }
    
    contactModalStatus(event): void {
        this.showSoniaModal = this.showSoniaModal ? false : true;
    }
    
    packagesModalStatus(event: boolean): void {
        this.modalStatus = event;
    }
    
    openPackagesModal(price: number, type: string, time: number): void {
        this.packagePrice = price;
        this.originalPrice = price;
        this.packageType = type;
        this.packageTime = time;
        this.modalStatus = true;
        this.cookieService.remove('collection');
    }
}
