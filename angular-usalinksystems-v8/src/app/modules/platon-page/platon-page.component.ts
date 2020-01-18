import {Component, AfterViewInit, OnDestroy} from '@angular/core';
import {MetaService} from '@app/shared';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-platon-page',
    templateUrl: './platon-page.component.html',
    styleUrls: ['./platon-page.component.scss']
})
export class PlatonPageComponent implements AfterViewInit, OnDestroy {
    
    constructor(
        private metaService: MetaService,
        private activatedRoute: ActivatedRoute
    ) {
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
}
