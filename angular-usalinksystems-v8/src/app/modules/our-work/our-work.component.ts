import {Component, AfterViewInit, OnDestroy} from '@angular/core';
import {MetaService} from '@app/shared';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-our-work',
    templateUrl: './our-work.component.html',
    styleUrls: ['./our-work.component.scss']
})
export class OurWorkComponent implements AfterViewInit, OnDestroy {
    
    public imgNum: number = 1;
    public interval: any;
    
    constructor(
        private metaService: MetaService,
        private route: ActivatedRoute
    ) {
    }
    
    ngAfterViewInit(): void {
        this.imageSlider();
        this.metaService.addMetaTags({
            title: this.route.snapshot.data.meta['title'],
            description: this.route.snapshot.data.meta['description'],
            keywords: this.route.snapshot.data.meta['keywords']
        });
    }
    
    ngOnDestroy() {
        clearInterval(this.interval);
        this.metaService.removeMetaTags();
    }
    
    imageSlider(): void {
        var i;
        var prev;
        var rootClass = this;
        this.interval = setInterval(function() {
            i = Math.round(Math.random() * 92) + 1;
            i === prev ? i = i + 1 : false;
            rootClass.imgNum = i;
            prev = i;
        }, 1000);
    }
}
