import {AfterViewInit, Component, EventEmitter, Inject, Input, Output, ChangeDetectorRef, Renderer2} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-youtube-modal',
    templateUrl: './youtube-modal.component.html',
    styleUrls: ['./youtube-modal.component.scss']
})
export class YoutubeModalComponent implements AfterViewInit {
    
    @Input() link: string;
    @Input() title: string;
    @Output() returnEvent = new EventEmitter<boolean>(true);
    
    private window: Window;
    public bodyscrollX: number;
    public bodyscrollY: number;
    public youtubeLink: any;
    
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private sanitizer: DomSanitizer,
        private cdRef: ChangeDetectorRef,
        private renderer: Renderer2) {
        this.window = this.document.defaultView;
    }
    
    ngAfterViewInit(): void {
        this.youtubeLink = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.link + '?autoplay=1');
        this.cdRef.detectChanges();
        this.preventBodyFromScrolling(true);
    }
    
    closeModal($event: any): void {
        let modalElem = $event.target.classList.contains('popup');
        let crossElem = $event.target.classList.contains('popup__cross');
        if (modalElem || crossElem) {
            this.returnEvent.emit(false);
            this.preventBodyFromScrolling(false);
        }
    }
    
    preventBodyFromScrolling(status: boolean): void {
        if (status) {
            this.bodyscrollX = this.window.scrollX;
            this.bodyscrollY = this.window.scrollY;
            this.renderer.addClass(this.document.body,'block-scroll');
            this.renderer.setStyle(this.document.body, 'top',-this.bodyscrollY.toString() + 'px');
        } else {
            this.renderer.removeClass(this.document.body,'block-scroll');
            this.window.scrollBy(this.bodyscrollX, this.bodyscrollY);
        }
    }
}
