import {Component, OnInit} from '@angular/core';
import {CommonProvider} from '@app/shared';

@Component({
    selector: 'app-enjoy-reading',
    templateUrl: './enjoy-reading.component.html',
    styleUrls: ['./enjoy-reading.component.scss'],
    providers: [CommonProvider]
})
export class EnjoyReadingComponent implements OnInit {
    
    public blogList: any;
    
    constructor(private commonProvider: CommonProvider) {}
    
    ngOnInit(): void {
        this.getRecords();
    }
    
    getRecords(): void {
        this.commonProvider.getRequest(`/blog/get_enjoy_reading`).then(response => {
            this.blogList = response.content.enjoy_reading;
        });
    }
    
    getLink(title: any, id: number): string {
        let link: string = title.toLocaleLowerCase()
            .substring(0, 30)
            .replace(/[^\w\d]/g, '-')
            .replace(/[-]{2,}/g, '-');
        return '/whats-new/details/' + link + '-' + id;
    }
}
