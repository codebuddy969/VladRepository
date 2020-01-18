import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {CommonProvider, MetaService} from '@app/shared';
import {NgxGalleryOptions, NgxGalleryImage} from 'ngx-gallery';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-whats-new',
    templateUrl: './whats-new.component.html',
    styleUrls: ['./whats-new.component.scss'],
    providers: [CommonProvider]
})
export class WhatsNewComponent implements OnInit, AfterViewInit, OnDestroy {
    
    public blogsList: Array<Object> = [];
    public eventsList: any;
    
    public maxBlogs: number = 3;
    public maxEvent: number = 4;
    
    public galleryOptions: NgxGalleryOptions[];
    public galleryImages: NgxGalleryImage[] = [];
    public showGallery = false;
    
    constructor(
        private commonProvider: CommonProvider,
        private activatedRoute: ActivatedRoute,
        private metaService: MetaService
    ) {
    }
    
    ngOnInit(): void {
        this.getBlogs();
        this.getEvents();
    }
    
    ngAfterViewInit(): void {
        this.metaService.addMetaTags({
            title: this.activatedRoute.snapshot.data.meta['title'],
            description: this.activatedRoute.snapshot.data.meta['description'],
            keywords: this.activatedRoute.snapshot.data.meta['keywords']
        });
    }
    
    ngOnDestroy(): void {
        this.metaService.removeMetaTags();
    }
    
    getBlogs(): void {
        this.commonProvider.getRequest(`blog/get_all?page=1&per_page=3`).then(response => {
            this.blogsList = response.content.blogs;
        });
    }
    
    getEvents(): void {
        this.commonProvider.getRequest(`events/get_all?page=1&per_page=2`).then(response => {
            this.eventsList = response.content.events;
        });
    }
    
    getLink(title: any, id: number): string {
        let link: string = title.toLocaleLowerCase()
            .substring(0, 30)
            .replace(/[^\w\d]/g, '-')
            .replace(/[-]{2,}/g, '-');
        return '/whats-new/details/' + link + '-' + id;
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
        
        let elem_length = type.length;
        
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
