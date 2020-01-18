import { Component, OnInit, DoCheck, Renderer2, ElementRef } from '@angular/core';

@Component({
    selector: 'app-blog-details',
    templateUrl: './blog-details.component.html',
    styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit, DoCheck {

    public action: boolean = false;
    public media_md: boolean = false;
    public background_width: number;

    public block_btn: boolean = false;
    public comments_count: number = 1;
    public comments_content: Array<Object> = [];

    //----------------------------------------

    constructor( private renderer: Renderer2, private el: ElementRef ) { }

    ngOnInit(): void {
        this.main_content();
    }

    //----------------------------------------

    ngDoCheck(): void {
        window.matchMedia("(max-width: 991px)").matches ? this.media_md = true : this.media_md = false;
        this.checkLeftDistance();
    }

    //----------------------------------------

    checkSocials($event: any): void {
        if($event.target.classList.contains('details__social-title')) {
            let elem = new ElementRef($event.target.parentElement);
            if($event.target.parentElement.classList.contains('active')) {
                this.renderer.removeClass(elem.nativeElement, 'active');
            } else {
                this.renderer.addClass(elem.nativeElement, 'active');
            }
        }
    }

    //----------------------------------------

    checkLeftDistance(): void {
        if(!this.media_md) {
            setTimeout(() => {
                let book = this.el.nativeElement.querySelector('.details__title');
                this.background_width = book.getBoundingClientRect().left - 15;
            }, 0);
        } else {
            this.background_width = window.outerWidth;
        }
    }

    //----------------------------------------

    checkModal($event): void {
        $event === false ? this.action = false : this.action = true;
    }

    //----------------------------------------

    addComment(): void { 
        this.comments_count = this.comments_count + 1;
        this.comments_count === this.comments_content.length - 1 ? this.block_btn = true : this.block_btn = false;
    }

    //----------------------------------------

    main_content(): void {
        this.comments_content = [
            {
                text: "I hope that my books allow readers to look up from the stories on the page and see the stories taking place around them just as clearly.",
                author: "Rima Maidaniuc",
                date: "April 12, 2018",
            },
            {
                text: "Braving unimaginable peril, often clinging to the sides and tops of freight trains, Enrique travels through hostile worlds full of thugs, bandits, and corrupt cops.  But he pushes forward, relying on his wit, courage, hope, and the kindness of strangers.",
                author: "Melissa Georgia",
                date: "April 15, 2018",
            },
            {
                text: "I hope that my books allow readers to look up from the stories on the page and see the stories taking place around them just as clearly.",
                author: "Rima Maidaniuc",
                date: "April 12, 2018",
            },
            {
                text: "Braving unimaginable peril, often clinging to the sides and tops of freight trains, Enrique travels through hostile worlds full of thugs, bandits, and corrupt cops.  But he pushes forward, relying on his wit, courage, hope, and the kindness of strangers.",
                author: "Melissa Georgia",
                date: "April 15, 2018",
            },
        ];
    }
}
