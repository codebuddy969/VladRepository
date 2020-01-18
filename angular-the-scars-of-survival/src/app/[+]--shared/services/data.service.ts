import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { templateJitUrl } from '@angular/compiler';
import { Meta } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class DataService implements OnInit {

    public meta_content: Array<any> = [];
    
    burger_state = new BehaviorSubject<string>('false');
    current_state = this.burger_state.asObservable();
    
    book_on_scroll = new BehaviorSubject<boolean>(false);
    book_on_scroll_state = this.book_on_scroll.asObservable();

    constructor( public meta: Meta ) { }

    ngOnInit() { }
    
    attachBookToTop(state: boolean): void {
        this.book_on_scroll.next(state);
    }

    changeBurgerState(state: string): void {
        this.burger_state.next(state);
    }

    addMetaTags(metatags): void {
        this.meta.addTag({ name: 'og:image', content: metatags[0].image });
        this.meta.addTag({ name: 'og:image:width', content: metatags[0].width });
        this.meta.addTag({ name: 'og:image:height', content: metatags[0].height });
        this.meta.addTag({ name: 'og:title', content: metatags[0].ogTitle });
        this.meta.addTag({ name: 'og:type', content: metatags[0].ogType });
        this.meta.addTag({ name: 'og:url', content: metatags[0].ogUrl });
        this.meta.addTag({ name: 'og:description', content: metatags[0].ogDescription });
    }

    removeMetaTags(): void {
        this.meta.removeTag("name='og:image'");
        this.meta.removeTag("name='og:image:width'");
        this.meta.removeTag("name='og:image:height'");
        this.meta.removeTag("name='og:title'");
        this.meta.removeTag("name='og:type'");
        this.meta.removeTag("name='og:url'");
        this.meta.removeTag("name='og:description'");
    }
    
}
