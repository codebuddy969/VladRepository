import {
    Component,
    OnInit,
    HostListener,
    Renderer2,
    Inject,
    ViewChildren,
    QueryList,
    ViewChild,
    ElementRef,
    AfterViewInit,
    OnDestroy,
    ChangeDetectorRef
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {CommonProvider, MetaService} from '@app/shared';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-who-we-are',
    templateUrl: './who-we-are.component.html',
    styleUrls: ['./who-we-are.component.scss'],
    providers: [CommonProvider]
})
export class WhoWeAreComponent implements OnInit, AfterViewInit, OnDestroy {
    
    public services_list;
    public show_video = true;
    public show_play = false;
    public show_animation = false;
    private window: Window;
    
    @ViewChild('videoplayer', {static: false}) videoplayer: ElementRef;
    @ViewChildren('info_modal') info_modal: QueryList<any>;
    
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private renderer: Renderer2,
        private activatedRoute: ActivatedRoute,
        private metaService: MetaService,
    ) {
        this.window = this.document.defaultView;
    }
    
    ngOnInit(): void {
        this.show_animation = true;
        this.updateServiceList();
    }
    
    ngAfterViewInit(): void {
        this.metaService.addMetaTags({
            title: this.activatedRoute.snapshot.data.meta['title'],
            description: this.activatedRoute.snapshot.data.meta['description'],
            keywords: this.activatedRoute.snapshot.data.meta['keywords']
        });
        this.videoStatus();
    }
    
    ngOnDestroy(): void {
        this.metaService.removeMetaTags();
    }
    
    @HostListener('window:resize')
    windowResize(): void {
        this.updateServiceList();
        this.videoStatus();
    }
    
    updateServiceList(): void {
        if (window.matchMedia('(max-width: 767px)').matches) {
            this.services_list = {
                row1: [
                    {
                        id: 'advertising',
                        title: 'advertising',
                        link: 'advertising',
                        image: 'city.png',
                        description: 'We go the extra mile to develop engaging <strong>online advertising campaigns</strong> consumers will love.',
                        infoStyles: {
                            'background-image': 'url(/assets/img/services/city.png)'
                        }
                    }, {
                        id: 'strategy',
                        title: 'strategy',
                        link: 'strategy',
                        image: 'strategy.png',
                        description: 'Through analysis and innovation, we turn vision into reality that elevate a brand’s <strong>online presence</strong> through <strong>purposeful strategy</strong>.',
                        infoStyles: {
                            'background-image': 'url(/assets/img/services/strategy.png)'
                        }
                    }, {
                        id: 'social',
                        title: 'social media',
                        link: 'social-media',
                        image: 'social.png',
                        description: 'We know how to use <strong>marketing analytics</strong>  to create a stronger, more personable social presence.',
                        infoStyles: {
                            'background-image': 'url(/assets/img/services/social.png)'
                        }
                    }],
                row2: [
                    {
                        id: 'branding',
                        title: 'branding',
                        link: 'branding',
                        image: 'branding.png',
                        description: 'Our <strong>designers</strong> and </strong>creative team<strong> bring identity and personality to your </strong>brand</strong> because we know image matters.',
                        infoStyles: {
                            'background-image': 'url(/assets/img/services/branding.png)'
                        }
                    }, {
                        id: 'technology',
                        title: 'technology',
                        link: 'technology',
                        image: 'technology.png',
                        description: 'We bridge the gap between science and consumers through measurable <strong>internet marketing strategies</strong> that help solve your <strong>brands</strong> problems through techniques, skills, and raw data.',
                        infoStyles: {
                            'background-image': 'url(/assets/img/services/technology.png)'
                        }
                    }, {
                        id: 'design',
                        title: 'design',
                        link: 'design',
                        image: 'design.png',
                        description: 'We craft innovative <strong>designs</strong> such as <strong>logos, banners, apps, email templates</strong>, and <strong>website</strong> layouts that will create effective and striking imagery in each <strong>digital marketing campaigns</strong>. ',
                        infoStyles: {
                            'background-image': 'url(/assets/img/services/design.png)'
                        }
                    }
                ],
                row3: [
                    {
                        id: 'marketing',
                        title: 'marketing',
                        link: 'marketing',
                        image: 'marketing.png',
                        description: 'We develop success by cultivating a clear and concise <strong>marketing plan</strong> to help create inspired work.',
                        infoStyles: {
                            'background-image': 'url(/assets/img/services/marketing.png)'
                        }
                    }, {
                        id: 'media',
                        title: 'media',
                        link: 'media',
                        image: 'media.png',
                        description: 'We optimize digital <strong>social media</strong> content to maximize our clients’ <strong>online exposure</strong> with carefully crafted <strong>ads</strong>.',
                        infoStyles: {
                            'background-image': 'url(/assets/img/services/media.png)'
                        }
                    }, {
                        id: 'digital',
                        title: 'digital',
                        link: 'digital',
                        image: 'digital.png',
                        description: 'We transform the way consumers experience content from <strong>email marketing campaigns</strong> to other <strong>digital campaigns</strong>.',
                        infoStyles: {
                            'background-image': 'url(/assets/img/services/digital.png)'
                        }
                    }
                ]
            };
        } else {
            this.services_list = {
                row1: [
                    {
                        id: 'advertising',
                        title: 'advertising',
                        link: 'advertising',
                        image: 'city.png',
                        description: 'We go the extra mile to develop engaging <strong>online advertising campaigns</strong> consumers will love.',
                        infoStyles: {
                            'background-image': 'url(/assets/img/services/city.png)'
                        }
                    }, {
                        id: 'strategy',
                        title: 'strategy',
                        link: 'strategy',
                        image: 'strategy.png',
                        description: 'Through analysis and innovation, we turn vision into reality that elevate a brand’s <strong>online presence</strong> through <strong>purposeful strategy</strong>.',
                        infoStyles: {
                            'background-image': 'url(/assets/img/services/strategy.png)'
                        }
                    }, {
                        id: 'branding',
                        title: 'branding',
                        link: 'branding',
                        image: 'branding.png',
                        description: 'Our <strong>designers</strong> and </strong>creative team<strong> bring identity and personality to your </strong>brand</strong> because we know image matters.',
                        infoStyles: {
                            'background-image': 'url(/assets/img/services/branding.png)'
                        }
                    }, {
                        id: 'technology',
                        title: 'technology',
                        link: 'technology',
                        image: 'technology.png',
                        description: 'We bridge the gap between science and consumers through measurable <strong>internet marketing strategies</strong> that help solve your <strong>brands</strong> problems through techniques, skills, and raw data.',
                        infoStyles: {
                            'background-image': 'url(/assets/img/services/technology.png)'
                        }
                    }
                ],
                row2: [
                    {
                        id: 'social',
                        title: 'social media',
                        link: 'social-media',
                        image: 'social.png',
                        description: 'We know how to use <strong>marketing analytics</strong>  to create a stronger, more personable social presence.',
                        infoStyles: {
                            'background-image': 'url(/assets/img/services/social.png)'
                        }
                    }, {
                        id: 'marketing',
                        title: 'marketing',
                        link: 'marketing',
                        image: 'marketing.png',
                        description: 'We develop success by cultivating a clear and concise <strong>marketing plan</strong> to help create inspired work.',
                        infoStyles: {
                            'background-image': 'url(/assets/img/services/marketing.png)'
                        }
                    }, {
                        id: 'design',
                        title: 'design',
                        link: 'design',
                        image: 'design.png',
                        description: 'We craft innovative <strong>designs</strong> such as <strong>logos, banners, apps, email templates</strong>, and <strong>website</strong> layouts that will create effective and striking imagery in each <strong>digital marketing campaigns</strong>. ',
                        infoStyles: {
                            'background-image': 'url(/assets/img/services/design.png)'
                        }
                    }
                ],
                row3: [
                    {
                        id: 'media',
                        title: 'media',
                        link: 'media',
                        image: 'media.png',
                        description: 'We optimize digital <strong>social media</strong> content to maximize our clients’ <strong>online exposure</strong> with carefully crafted <strong>ads</strong>.',
                        infoStyles: {
                            'background-image': 'url(/assets/img/services/media.png)'
                        }
                    },
                    {
                        id: 'digital',
                        title: 'digital',
                        link: 'digital',
                        image: 'digital.png',
                        description: 'We transform the way consumers experience content from <strong>email marketing campaigns</strong> to other <strong>digital campaigns</strong>.',
                        infoStyles: {
                            'background-image': 'url(/assets/img/services/digital.png)'
                        }
                    }
                ]
            };
        }
    }
    
    videoStatus(): void {
        if (this.videoplayer.nativeElement) {
            if (this.window.matchMedia('(max-width: 1023px)').matches) {
                this.videoplayer.nativeElement.pause();
                this.show_play = true;
            } else {
                this.videoplayer.nativeElement.play();
            }
        }
    }
    
    playVideo(): void {
        this.videoplayer.nativeElement.play();
        this.show_play = false;
    }
    
    callInfo(id: string): void {
        const element = document.getElementById(id);
        this.info_modal.forEach((row: ElementRef) => {
            this.renderer.removeClass(row.nativeElement, 'active');
        });
        this.renderer.addClass(element, 'active');
    }
    
    closeInfo(): void {
        this.info_modal.forEach((row: ElementRef) => {
            this.renderer.removeClass(row.nativeElement, 'active');
        });
    }
    
}
