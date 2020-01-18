import {AfterViewInit, Component, OnInit, Inject, ElementRef, ChangeDetectorRef} from '@angular/core';
import {ColorChange, MenuState} from '@app/shared';
import {NavigationEnd, Router, ActivatedRoute} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {Animations} from './app.route.animations';

// declare let ga: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [Animations]
})
export class AppComponent implements OnInit, AfterViewInit {
    
    public unsubscribe = false;
    public isService = false;
    public isGuideline = false;
    public menuState = false;
    public drawerColor = 'red';
    public url = '/';
    
    public routeHome = false;
    public route404 = false;
    
    private window: Window;
    public date = new Date();
    
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private router: Router,
        private route: ActivatedRoute,
        private el: ElementRef,
        private cdRef: ChangeDetectorRef
    ) {
        this.window = this.document.defaultView;
    }
    
    ngOnInit(): void {
        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                this.assignRoute(this.router.url);
            }
        });
        
        this.router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {
                // ga('create', 'UA-114839161-1', 'auto');
                // ga('set', 'page', e.urlAfterRedirects);
                // ga('send', 'pageview');
                
                this.url = e.urlAfterRedirects;
                this.closeSideMenu();
                
                if (this.url === '/events') {
                    this.drawerColor = 'blue';
                }
                
                this.isGuideline = this.url.includes('guideline') ? true : false;
                this.unsubscribe = this.url.includes('unsubscribe') ? true : false;
                const serviceLinks = [
                    '/services-old',
                    '/services-old/brand',
                    '/services-old/design',
                    '/services-old/campaigns',
                    '/services-old/social',
                    '/services-old/cross-media',
                    '/services-old/content',
                    '/services-old/development',
                    '/services-old/integration',
                    '/services-old/consulting',
                    '/services-old/optimization',
                    '/services-old/project-management',
                    '/services/advertising',
                    '/services/strategy',
                    '/services/branding',
                    '/services/technology',
                    '/services/social-media',
                    '/services/marketing',
                    '/services/design',
                    '/services/digital',
                    '/services/media'
                ];
                const filtered = serviceLinks.filter(page => this.url === page);
                filtered[0] ? this.isService = true : this.isService = false;
            }
        });
    }
    
    ngAfterViewInit(): void {
        ColorChange.getInstance().colorEmitter.subscribe((color: string) => {
            this.drawerColor = color;
        });
    }
    
    assignRoute(route: string): void {
        this.routeHome = route === '/' ? true : false;
        this.route404 = route === '/404' ? true : false;
        this.cdRef.detectChanges();
    }
    
    toggleSideMenu(): void {
        if (this.menuState) {
            this.closeSideMenu();
        } else {
            this.openSideMenu();
        }
    }
    
    openSideMenu(): void {
        this.menuState = true;
        MenuState.getInstance().state = true;
        this.document.getElementsByTagName('body')[0].classList.add('block-scroll');
    }
    
    closeSideMenu(): void {
        this.menuState = false;
        MenuState.getInstance().state = false;
        this.document.getElementsByTagName('body')[0].classList.remove('block-scroll');
    }
    
    preventTouchScroll($event: Event): void {
        $event.preventDefault();
    }
    
    
}
