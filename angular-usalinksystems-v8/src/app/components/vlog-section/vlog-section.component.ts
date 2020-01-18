import {Component, AfterViewInit} from '@angular/core';
import {CommonProvider} from '@app/shared';

@Component({
    selector: 'app-vlog-section',
    templateUrl: './vlog-section.component.html',
    styleUrls: ['./vlog-section.component.scss'],
    providers: [CommonProvider]
})
export class VlogSectionComponent implements AfterViewInit {
    
    public vlogList: any;
    public vlog_modal_status = false;
    public vlog_modal_title;
    public vlog_modal_link;
    
    constructor(private commonProvider: CommonProvider) { }
    
    ngAfterViewInit(): void {
        this.getVideo();
    }
    
    getVideo(): void {
        this.commonProvider.postRequest('vlog/get_published', {location: 'main'}).then((response: any) => {
            this.vlogList = response.content.vlog;
        });
    }
    
    playVideo(title: string, link: string): void {
        this.vlog_modal_link = link;
        this.vlog_modal_title = title;
        this.vlog_modal_status = true;
    }
    
    youtubeModalStatus(event): void {
        this.vlog_modal_status = this.vlog_modal_status ? false : true;
    }
    
}
