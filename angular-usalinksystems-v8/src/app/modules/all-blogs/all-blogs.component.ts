import {AfterViewInit, OnDestroy, Component, ElementRef, ViewChild, Renderer2} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {CommonProvider, MetaService} from '@app/shared';

@Component({
    selector: 'app-all-blogs',
    templateUrl: './all-blogs.component.html',
    styleUrls: ['./all-blogs.component.scss'],
    providers: [CommonProvider]
})
export class AllBlogsComponent implements AfterViewInit, OnDestroy {
    
    @ViewChild('container', {static: false}) container: ElementRef;
    
    public currentPage: number = 1;
    public itemsPerPage: number = 6;
    public totalPages: Array<Object> = [];
    public totalItems: number = 100;
    public blogsList: Array<Object> = [];
    public maxBlogs: number = 999;
    public activeClass: number = 1;
    public blogPreloader: boolean = false;
    public showPagination: boolean = false;
    
    constructor(
        private router: Router,
        private renderer: Renderer2,
        private route: ActivatedRoute,
        private commonProvider: CommonProvider,
        private metaService: MetaService,
        private location: Location) {
    }
    
    ngAfterViewInit(): void {
        this.getBlogs();
        this.metaService.addMetaTags({
            title: this.route.snapshot.data.meta['title'],
            description: this.route.snapshot.data.meta['description'],
            keywords: this.route.snapshot.data.meta['keywords']
        });
    }
    
    ngOnDestroy(): void {
        this.metaService.removeMetaTags();
    }
    
    getBlogs(page?: number): void {
        
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
        
        this.blogPreloader = true;
        
        this.commonProvider.getRequest(`/blog/get_all?page=${this.currentPage}&per_page=${this.itemsPerPage}`).then(response => {
            this.blogsList = response.content.blogs;
            this.totalItems = response.content.total_records;
            this.showPagination = this.totalItems > this.itemsPerPage ? true : false;
            this.blogPreloader = false;
            
            this.setPagination(this.totalItems);
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.renderer.setStyle(this.container.nativeElement, 'height', 'auto');
        }, console.log);
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
        this.getBlogs(page);
    }
    
    getLink(title: any, id: number): string {
        let link: string = title.toLocaleLowerCase()
            .substring(0, 30)
            .replace(/[^\w\d]/g, '-')
            .replace(/[-]{2,}/g, '-');
        return '/whats-new/details/' + link + '-' + id;
    }
}
