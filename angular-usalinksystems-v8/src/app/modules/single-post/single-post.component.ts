import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild, HostListener, ElementRef, Inject} from '@angular/core';
import {DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute, NavigationEnd, Router, UrlSegment} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommonProvider, CustomValidators, MetaService} from '@app/shared';
import {DOCUMENT, Location, PlatformLocation} from '@angular/common';
import {Observable} from 'rxjs';

import {FacebookService, FBCommentsComponent, InitParams} from 'ngx-facebook';

@Component({
    selector: 'app-single-post',
    templateUrl: './single-post.component.html',
    styleUrls: ['./single-post.component.scss'],
    providers: [CommonProvider, FacebookService]
})
export class SinglePostComponent implements OnInit, AfterViewInit, OnDestroy {
    
    @ViewChild(FBCommentsComponent, {static: false}) fbComments: FBCommentsComponent;
    @ViewChild('socialsRef', {static: false}) socialsRef: ElementRef;
    
    private window: Window;
    public main_image: string = '';
    public image_name: string = '';
    public image_path: string = '';
    public screen_width: string = '';
    public form: FormGroup;
    public shareButtons: any = [];
    public formStateSuccess: boolean = false;
    public blog: any = {};
    public otherBlogPosts: Array<any> = [];
    public commentFormOpened: boolean = false;
    public commentsLimit: number = 5;
    public comments: Array<Object> = [];
    public nextBlog: any = null;
    public prevBlog: any = null;
    public showLoadCommentsButton: boolean = true;
    public show: boolean = false;
    public currenUrl: Observable<UrlSegment[]> = null;
    public location_origin: string;
    public preloader_status: boolean = false;
    
    public action: boolean = false;
    public messageData: Object = {};
    
    public showSubscribe: boolean = false;
    public finalClose: boolean = false;
    
    constructor(@Inject(DOCUMENT) private document: Document,
                private locationR: Location,
                private platformLocation: PlatformLocation,
                private router: Router,
                private sanitized: DomSanitizer,
                private commonProvider: CommonProvider,
                private route: ActivatedRoute,
                private metaService: MetaService,
                private fb: FacebookService) {
        
        let initParams: InitParams = {
            appId: '1234566778',
            xfbml: true,
            version: 'v2.8'
        };
        
        fb.init(initParams);
        
        // let buttons: Array<{ type: number, icon: string }> = [{
        //     type: ShareProvider.FACEBOOK,
        //     icon: 'fa-facebook'
        // }, {
        //     type: ShareProvider.TWITTER,
        //     icon: 'fa-twitter'
        // }, {
        //     type: ShareProvider.PINTEREST,
        //     icon: 'fa-pinterest-p'
        // }, {
        //     type: ShareProvider.TUMBLR,
        //     icon: 'fa-tumblr'
        // }];
        //
        // for (let i = 0; i < buttons.length; i++) {
        //     this.shareButtons.push(new ShareButton(buttons[i].type, `<i class="fa ${buttons[i].icon}"></i>`, ''));
        // }
        
        this.form = new FormGroup({
            type: new FormControl('post-comment'),
            first_name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
            last_name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
            email: new FormControl('', [Validators.required, CustomValidators.validateEmail]),
            message: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(500)]),
            id_blog: new FormControl('', [Validators.required])
        });
        
        
        this.window = this.document.defaultView;
        this.setScreenWidthVariable();
    }
    
    @HostListener('window:scroll')
    onWindowScroll(): void {
        this.displaySubscribeModal();
    }
    
    @HostListener('window:resize')
    onWindowResize(): void {
        this.displaySubscribeModal();
        this.setScreenWidthVariable();
    }
    
    ngOnInit(): void {
        this.getBlog();
        this.preloader_status = true;
        this.currenUrl = this.route.url;
        this.router.events.subscribe((event: any) => {
            this.location_origin = (this.platformLocation as any).location.origin;
            event instanceof NavigationEnd ? this.getBlog() : false;
        });
    }
    
    ngAfterViewInit(): void {
        this.currenUrl.subscribe((u) => {
            this.fbComments.href = `${location.origin}/${u.join('/')}`;
            setTimeout(() => {
                if (typeof window['FB'] !== 'undefined') {
                    window['FB'].XFBML.parse();
                }
            });
        });
    }
    
    ngOnDestroy(): void {
        this.metaService.removeMetaTags();
    }
    
    public transform(value: string, type: string = 'html'): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
        switch (type) {
            case 'html':
                return this.sanitized.bypassSecurityTrustHtml(value);
            case 'style':
                return this.sanitized.bypassSecurityTrustStyle(value);
            case 'script':
                return this.sanitized.bypassSecurityTrustScript(value);
            case 'url':
                return this.sanitized.bypassSecurityTrustUrl(value);
            case 'resourceUrl':
                return this.sanitized.bypassSecurityTrustResourceUrl(value);
            default:
                throw new Error(`Invalid safe type specified: ${type}`);
        }
    }
    
    setScreenWidthVariable(): void {
        this.screen_width = '';
        if (this.window.matchMedia('(max-width: 991px)').matches) {
            this.screen_width = '_medium';
        }
        if (this.window.matchMedia('(max-width: 575px)').matches) {
            this.screen_width = '_small';
        }
        if (this.image_name && this.image_path) {
            const image_array = this.image_name.split('.');
            this.main_image = `${this.image_path}${image_array[0]}${this.screen_width}.${image_array[1]}`;
        }
    }
    
    getBlog(): void {
        const blogId = this.route.snapshot.params['id'].split('-');
        this.commonProvider.getRequest('/blog/get_one/' + blogId[blogId.length - 1]).then(response => {
            this.metaService.removeMetaTags();
            if (response.status === 200 && response.message === 'ok') {
                this.blog = response.content;
                
                const image_array = this.blog.image_name.split('.');
                this.image_name = this.blog.image_name;
                this.image_path = this.blog.image_path;
                this.main_image = `${this.blog.image_path}${image_array[0]}${this.screen_width}.${image_array[1]}`;
                
                this.loadComments();
                this.getOtherBlogPosts();
                this.metaService.addMetaTags({
                    title: this.blog.title,
                    description: this.blog.short_content,
                    keywords: ''
                });
                
                if (this.blog.prev_id) {
                    this.commonProvider
                        .getRequest('/blog/get_one/' + this.blog.prev_id)
                        .then(response => {
                            this.prevBlog = response.content;
                        });
                } else {
                    this.prevBlog = null;
                }
                
                if (this.blog.next_id) {
                    this.commonProvider
                        .getRequest('/blog/get_one/' + this.blog.next_id)
                        .then(response => {
                            this.nextBlog = response.content;
                        });
                } else {
                    this.nextBlog = null;
                }
                this.preloader_status = false;
                
            } else {
                this.router.navigate(['/404']);
            }
        }, error => {
            console.log(error);
        });
    }
    
    getBlogLink(blog: any): string {
        let title: string = blog.title.toLocaleLowerCase().replace(/[^\w\d]/g, '-').replace(/[-]{2,}/g, '-');
        return '/whats-new/details/' + title + '-' + blog.id;
    }
    
    htmlTransform(value: any): SafeHtml {
        return this.sanitized.bypassSecurityTrustHtml(value);
    }
    
    resetForm(): void {
        let controls: any = this.form.controls;
        for (let controlName in controls) {
            if (controls.hasOwnProperty(controlName)) {
                controls[controlName].setValue('');
                controls[controlName].markAsPristine();
                controls['type'].setValue('post-comment');
            }
        }
    }
    
    runFormValidation(): void {
        let controls: any = this.form.controls;
        for (let controlName in controls) {
            if (controls.hasOwnProperty(controlName)) {
                controls[controlName].markAsDirty();
            }
        }
    }
    
    loadComments(): void {
        this.commonProvider.getRequest(`/comments/get_comments?id=${this.blog.id}&offset=${this.comments.length}&limit=${this.commentsLimit}`).then(response => {
            if (response.content.comments && response.content.comments.length) {
                this.comments = this.comments.concat(response.content.comments);
            } else {
                this.comments.length = 0;
            }
            
            this.showLoadCommentsButton = this.comments.length < response.content.total_records;
        }, error => {
            console.log(error);
        });
    }
    
    getOtherBlogPosts(): void {
        this.commonProvider.getRequest(`/blog/get_other?id=${this.blog.id}&limit=3`).then(response => {
            this.otherBlogPosts = response.content.blogs;
        }, error => {
            console.log(error);
        });
    }
    
    cutString(str: string, length: number): string {
        return str.substr(0, length).trim() + '...';
    }
    
    popup_message() {
        return this.messageData;
    }
    
    checkModal($event): void {
        $event === false ? this.action = false : this.action = true;
    }
    
    closeSubscribe(): void {
        this.finalClose = true;
        this.showSubscribe = false;
    }
    
    submitCommentForm($event: Event): void {
        $event.preventDefault();
        
        this.form.controls['id_blog'].setValue(this.blog.id);
        
        this.runFormValidation();
        
        if (this.form.invalid) {
            this.messageData = {title: 'Oops', text: 'Please complete all fields', error: true};
            this.action = true;
        } else {
            this.form.value.blog_url = window.location.href;
            this.commonProvider.postRequest('comments/comment_add', this.form.value).then((data: any) => {
                if (data.status === 200) {
                    this.resetForm();
                    this.messageData = {title: 'Thanks for getting in touch with us!', text: data.content, error: false};
                    this.action = true;
                } else {
                    this.messageData = {title: 'Oops', text: data.content, error: true};
                    this.action = true;
                }
            });
        }
    }
    
    displaySubscribeModal(): void {
        let position = this.socialsRef.nativeElement.getBoundingClientRect().top;
        if (position < 0 && !this.finalClose) {
            this.showSubscribe = true;
        }
    }
}
