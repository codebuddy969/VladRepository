import {Component, OnInit, OnDestroy, ElementRef, ViewChild, Renderer2} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {CommonProvider, MetaService} from '@app/shared';

@Component({
    selector: 'app-all-vlogs',
    templateUrl: './all-vlogs.component.html',
    styleUrls: ['./all-vlogs.component.scss'],
    providers: [CommonProvider]
})
export class AllVlogsComponent implements OnInit, OnDestroy {
    
    @ViewChild('container', {static: true}) container: ElementRef;
    
    public vlogList: Array<Object> = [];
    
    public vlog_modal_status = false;
    public vlog_modal_title;
    public vlog_modal_link;
    
    public currentPage: number = 1;
    public itemsPerPage: number = 6;
    public totalPages: Array<Object> = [];
    public totalItems: number = 100;
    public maxVlogs: number = 999;
    public vlogPreloader: boolean = false;
    public showPagination: boolean = false;
    
    constructor(
        private router: Router,
        private renderer: Renderer2,
        private route: ActivatedRoute,
        private location: Location,
        private metaService: MetaService,
        public commonProvider: CommonProvider) {}
    
    ngOnInit(): void {
        this.getVideo();
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
    
    getVideo(page?: number): void {
        if (!page) {
            this.currentPage = this.route.snapshot.params['page'] ? parseInt(this.route.snapshot.params['page'], 10) : 1;
            this.currentPage = this.currentPage && this.currentPage > 0 ? this.currentPage : 1;
        } else {
            this.currentPage = page;
        }
        
        const container_height = this.container.nativeElement.offsetHeight;
        
        if (container_height !== 0) {
            this.renderer.setStyle(this.container.nativeElement, 'height', (container_height) + 'px');
        }
        
        this.vlogPreloader = true;
    
        this.commonProvider
            .getRequest(`/vlog/get_published?page=${this.currentPage}&per_page=${this.itemsPerPage}`)
            .then(response => {
                this.vlogList = response.content.vlog;
                this.totalItems = response.content.total_records;
                this.showPagination = this.totalItems > this.itemsPerPage ? true : false;
                this.vlogPreloader = false;
    
                this.setPagination(this.totalItems);
                this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                this.renderer.setStyle(this.container.nativeElement, 'height', 'auto');
            }).catch(() => this.router.navigate(['/404']));
    }
    
    setPagination(records: number): void {
        this.totalPages = [];
        
        const remain = records % this.itemsPerPage;
        const output = records - remain;
        const pages  = output / this.itemsPerPage;
        
        let route = this.route.routeConfig.path.replace('/:page', '');
        
        for (let i = 1; i <= pages; i++) {
            this.totalPages.push({number: i, count: this.itemsPerPage * i, link: `/${route}/${i}`});
        }
        
        if (remain !== 0) {
            this.totalPages.push({number: pages + 1, count: records, link: `/${route}/${pages + 1}`});
        }
    }
    
    switchContent(link: string, page: number): void {
        this.location.replaceState(link);
        this.getVideo(page);
    }
    
    playVideo(title: string, link: string): void {
        this.vlog_modal_link = link;
        this.vlog_modal_title = title;
        this.vlog_modal_status = true;
    }
    
    youtubeModalStatus(): void {
        this.vlog_modal_status = !this.vlog_modal_status;
    }
}
