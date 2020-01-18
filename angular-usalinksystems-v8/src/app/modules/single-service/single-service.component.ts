import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {CommonProvider, MetaService} from '@app/shared';

@Component({
    selector: 'app-single-service',
    templateUrl: './single-service.component.html',
    styleUrls: ['./single-service.component.scss'],
    providers: [CommonProvider]
})
export class SingleServiceComponent implements OnInit, OnDestroy {
    
    @ViewChild('videoplayer', {static: false}) public videoplayer: ElementRef;
    
    public content_data: any;
    public content_meta: any;
    
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private metaService: MetaService,
        public commonProvider: CommonProvider,
        private sanitizer: DomSanitizer
    ) {
    }
    
    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            let active_route = this.route.snapshot.params['name'];
            let dataParam = {'current_page': active_route};
            this.sendRequest(dataParam);
        });
    }
    
    ngOnDestroy(): void {
        this.metaService.removeMetaTags();
    }
    
    sendRequest(dataParam: Object): void {
        this.metaService.removeMetaTags();
        this.commonProvider.postRequest('services/get_services', dataParam).then((response: any) => {
            response.content.data.video = this.sanitizer.bypassSecurityTrustUrl(response.content.data.video);
            this.content_meta = response.content.meta;
            this.content_data = response.content.data;
            this.metaService.addMetaTags({
                title: this.content_meta.title,
                description: this.content_meta.description,
                keywords: this.content_meta.keywords
            });
            this.refreshVideo();
        }).catch(() => this.router.navigate(['/404']));
    }
    
    refreshVideo(): void {
        let video = this.videoplayer.nativeElement;
        video.pause();
        video.load();
    }
}
