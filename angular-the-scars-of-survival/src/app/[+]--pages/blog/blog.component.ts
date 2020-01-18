import { Component, OnInit, OnDestroy, DoCheck, Renderer2, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../[+]--shared/services/data.service';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, DoCheck, OnDestroy {

    public media_md: boolean = false;
    public background_width: number;
    public page_content: Array<Object> = [];

    //----------------------------------------

    public meta_content: Array<Object> = [{
        ogTitle: "Some title",
        ogType: 'website',
        ogUrl: 'http://some.com',
        ogDescription: 'Some description',
        width: '315',
        height: '600',
        image: "assets/images/book-cover.jpg"
    }];

    //----------------------------------------

    constructor( 
        private dataService: DataService, 
        private renderer: Renderer2, 
        private el: ElementRef,
        private router: Router,
    ) { }

    //----------------------------------------

    ngOnInit() {
        this.main_content();
        this.dataService.addMetaTags(this.meta_content);
    }

    //----------------------------------------

    ngDoCheck(): void {
        window.matchMedia("(max-width: 991px)").matches ? this.media_md = true : this.media_md = false;
        this.checkLeftDistance();
    }

    //----------------------------------------

    checkSocials(this_post: Element) {
        if(this_post.classList.contains('active')) {
            this.renderer.removeClass(this_post, 'active');
        } else {
            this.renderer.addClass(this_post, 'active');
        }
    }

    //----------------------------------------

    checkLeftDistance(): void {
        if(!this.media_md) {
            setTimeout(() => {
                let book = this.el.nativeElement.querySelector('.post');
                this.background_width = book.getBoundingClientRect().left - 15;
            }, 0);
        } else {
            this.background_width = window.outerWidth;
        }
    }

    //----------------------------------------

    onPostClick(index, $title) {
        $title = $title.toLowerCase().replace(/[^A-Za-z0-9]/g, '-');
        this.router.navigateByUrl(`/blog/${$title}/${index}`);
    }

    //----------------------------------------

    main_content():void {
        this.page_content = [
            {
                id: "1",
                image: "assets/images/book-cover.jpg",
                label: "Book Release",
                title: "Release Announcement",
                text: "My first book is finally here! I am proud to announce that my first novel, The Scars of Survival: A Collection of Suffering and Sacrifice, is now available on Amazon.",
                date: "March 23, 2018",
                comments: 2
            },
            {
                id: "2",
                image: "assets/images/book-cover.jpg",
                label: "Other Books",
                title: "Recommended Reading",
                text: "While many people use books as an escape from the real world and all its hardships, the most compelling stories are often the ones based on the very reality we as",
                date: "April 12, 2018",
                comments: 1
            },
            {
                id: "3",
                image: "assets/images/book-cover.jpg",
                label: "Human Trafficking",
                title: "How to Fight Human Traffic",
                text: "The Resources you Need to make a Difference that Matters. A list of organizations who’ve made it their mission to keep the issue from getting even worse ...",
                date: "May 31, 2018",
                comments: 0
            },
        ];
    }

    //----------------------------------------

    ngOnDestroy() {
        this.dataService.removeMetaTags();
    }

}
