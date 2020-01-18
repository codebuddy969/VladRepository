import {Injectable} from '@angular/core';
import {Title, Meta} from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class MetaService {
    
    constructor(private metaService: Meta, private titleService: Title) {
    }
    
    addMetaTags(metatags: any): void {
        this.titleService.setTitle(metatags.title);
        this.metaService.addTag({name: 'keywords', content: metatags.keywords});
        this.metaService.addTag({name: 'description', content: metatags.description});
        this.metaService.addTag({name: 'og:title', content: metatags.title});
        this.metaService.addTag({name: 'og:description', content: metatags.description});
    }
    
    removeMetaTags(): void {
        this.metaService.removeTag('name=\'keywords\'');
        this.metaService.removeTag('name=\'description\'');
        this.metaService.removeTag('name=\'og:title\'');
        this.metaService.removeTag('name=\'og:description\'');
    }
}
