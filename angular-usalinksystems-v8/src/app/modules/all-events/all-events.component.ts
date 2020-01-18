import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {CommonProvider, MetaService} from '@app/shared';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxGalleryOptions, NgxGalleryImage} from 'ngx-gallery';

@Component({
    selector: 'app-all-events',
    templateUrl: './all-events.component.html',
    styleUrls: ['./all-events.component.scss'],
    providers: [CommonProvider]
})
export class AllEventsComponent implements OnInit, AfterViewInit, OnDestroy {
    
    public eventsList: Array<Object> = [];
    public maxEvent: number = 999;
    public galleryOptions: NgxGalleryOptions[];
    public galleryImages: NgxGalleryImage[] = [];
    public showGallery = false;
    
    constructor(
        public commonProvider: CommonProvider,
        private metaService: MetaService,
        private route: ActivatedRoute,
        private router: Router) {
    }
    
    ngOnInit(): void {
        this.getEvents();
    }
    
    ngAfterViewInit(): void {
        this.metaService.addMetaTags({
            title: this.route.snapshot.data.meta['title'],
            description: this.route.snapshot.data.meta['description'],
            keywords: this.route.snapshot.data.meta['keywords']
        });
    }
    
    ngOnDestroy(): void {
        this.metaService.removeMetaTags();
    }
    
    getEvents(): void {
        this.commonProvider.getRequest('/events/get_all').then((response: any) => {
            this.eventsList = response.content.events;
        }).catch(() => this.router.navigate(['/404']));
    }
    
    getLink(title: any, id: number): string {
        let link: string = title.toLocaleLowerCase()
            .substring(0, 30)
            .replace(/[^\w\d]/g, '-')
            .replace(/[-]{2,}/g, '-');
        return '/whats-new/' + link + '-' + id;
    }
    
    getGalleryImages(type: Array<string>): void {
        this.showGallery = true;
        this.galleryOptions = [
            {
                width: '950px',
                height: '700px',
                preview: false,
                thumbnailsColumns: 5
            },
            {
                breakpoint: 1440,
                width: '580px',
                height: '450px',
                imagePercent: 80,
                thumbnailsColumns: 4
                
            },
            {
                breakpoint: 600,
                thumbnailsColumns: 3,
                width: '320px',
                height: '290px',
                preview: false
            }
        ];
        
        const elem_length = type.length;
        
        for (let i = 0; i < elem_length; i++) {
            this.galleryImages.push({
                small: type[i],
                medium: type[i]
            });
        }
    }
    
    closePopup(): void {
        this.showGallery = false;
        this.galleryImages = [];
    }
}
