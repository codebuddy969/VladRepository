import {Component, AfterViewInit, OnDestroy} from '@angular/core';
import {MetaService} from '@app/shared';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-philippines',
    templateUrl: './philippines.component.html',
    styleUrls: ['./philippines.component.scss']
})
export class PhilippinesComponent implements AfterViewInit, OnDestroy {
    
    constructor(private metaService: MetaService, private route: ActivatedRoute) {
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
}
