import {Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, Inject, HostListener} from '@angular/core';
import {MetaService, CommonProvider, ImageService} from '@app/shared';
import {ActivatedRoute, Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {PageScrollService} from 'ngx-page-scroll-core';
import {ParticlesConfig} from '@modules/home-page/particle-config';

global['particlesJS'] = particlesJS;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [CommonProvider]
})
export class HomeComponent implements AfterViewInit, OnDestroy {
    
    @ViewChild('subscribeRef', {static: false}) subscribeRef: ElementRef;

    window: Window;
    showAlert = false;
    showUnsubscribe = false;
    messageData = {};
    slidingInterval;
    slideStatus;
    images = {
        banner: {
            original: "home_banner",
            extension: ".jpg",
            sizes: {large: "_BM", medium: "_BM", small: "_BS"},
            name: ''
        }
    }

    @HostListener('window:resize') resize() { this.imageService.setImageTypes(this.images) }

    constructor(
        @Inject(DOCUMENT) private document: any,
        private router: Router,
        public commonProvider: CommonProvider,
        public metaService: MetaService,
        public imageService: ImageService,
        public pageScrollService: PageScrollService,
        public activatedRoute: ActivatedRoute) {
        this.window = this.document.defaultView;
    }
    
    ngAfterViewInit(): void {
        this.metaService.addMetaTags({
            title: this.activatedRoute.snapshot.data.meta['title'],
            description: this.activatedRoute.snapshot.data.meta['description'],
            keywords: this.activatedRoute.snapshot.data.meta['keywords']
        });
        this.window[`pJSDom`] = [];
        this.initUnsubscribeModal();
        this.scrollToSubscribeSection();
        this.removeSubscription();
        this.initSlider();
        this.invokeParticles();
        this.imageService.setImageTypes(this.images);
    }

    invokeParticles(): void {
        particlesJS('particles-js', ParticlesConfig, () => {});
    }
    
    ngOnDestroy(): void {
        setTimeout(() => {
            this.window['pJSDom'][0].pJS.fn.vendors.destroypJS();
        });
        clearInterval(this.slidingInterval);
        this.metaService.removeMetaTags();
    }

    initSlider(): void {
        this.slidingInterval = setInterval(() => {
            this.slideStatus = !this.slideStatus;
        }, 20000);
    }
    
    scrollToSubscribeSection(): void {
        if (this.router.url === '/subscribe') {
            this.pageScrollService.scroll({
                document: this.document,
                scrollTarget: '.theEnd',
            });
        }
    }
    
    initUnsubscribeModal(): void {
        if (this.router.url === '/unsubscribe') {
            this.showUnsubscribe = true;
        }
    }

    removeSubscription(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            if (params['key'] !== undefined) {
                this.commonProvider.postRequest('send', {'hash': params['key']}).then((data: any) => {
                    this.showAlert = true;
                    this.messageData = {title: data.title, text: data.content, error: false};
                });
            }
        });
    }
    
    closeModal(): void {
        this.showAlert = false;
    }
    
    closeUnsubscribe(): void {
        this.showUnsubscribe = false;
    }
}
