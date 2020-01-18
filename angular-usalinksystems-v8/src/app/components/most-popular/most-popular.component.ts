import {Component, OnInit} from '@angular/core';
import {CommonProvider} from '@app/shared';

@Component({
    selector: 'app-most-popular',
    templateUrl: './most-popular.component.html',
    styleUrls: ['./most-popular.component.scss'],
    providers: [CommonProvider]
})
export class MostPopularComponent implements OnInit {
    
    public blogList: any;
    
    constructor(private commonProvider: CommonProvider) { }
    
    ngOnInit(): void {
        this.getRecords();
    }
    
    getRecords(): void {
        this.commonProvider.getRequest(`/blog/get_most_popular`).then(response => {
            this.blogList = response.content.most_popular;
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
