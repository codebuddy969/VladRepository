import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import {CommonProvider, MetaService} from '@app/shared';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-usa',
    templateUrl: './usa.component.html',
    styleUrls: ['./usa.component.scss'],
    providers: [CommonProvider]
})
export class UsaComponent implements OnInit, AfterViewInit, OnDestroy {
    
    public members: Array<Object> = [];
    @ViewChild('member', {static: false}) member: any;
    
    constructor(
        private commonProvider: CommonProvider,
        private metaService: MetaService,
        private route: ActivatedRoute) {
    }
    
    ngOnInit() {
        this.getAllEmployees();
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
    
    getAllEmployees(): void {
    
        this.commonProvider.getRequest(`Employees/get_employees`).then(response => {
            this.members = response.content;
        }, error => {
            console.log(error);
        });
    }
}
