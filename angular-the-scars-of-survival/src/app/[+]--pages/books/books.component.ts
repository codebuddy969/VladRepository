import { Component, OnInit, DoCheck, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Location } from '@angular/common';

import { DataService } from '../../[+]--shared/services/data.service';

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.scss'],
    animations: [
        trigger('elementState', [
            state('element_show', style({
                opacity: 1,
                pointerEvents: 'initial',
                transition: 'all 0.35s linear'
            })),
            state('element_hide', style({
                opacity: 0,
                display: 'none',
                pointerEvents: 'none',
                transition: 'all 0.35s linear'
            })),
        ]),
        trigger('pageState', [
            state('page_left', style({
                transform: 'translateX(0%)'
            })),
            transition('* => *', animate('800ms linear'))
        ]),
        trigger('synopsisState', [
            state('synopsis_show', style({
                display: 'block'
            })),
            state('synopsis_hidden', style({
                display: 'none'
            }))
        ]),
        trigger('buttonState', [
            state('button_hide', style({
                height: 0,
                overflow: 'hidden',
                opacity: 0,
                borderWidth: 0
            })),
            state('button_show', style({
                height: 'auto',
                overflow: 'inherit',
                opacity: 1,
                borderWidth: '1px'
            })),
            transition('button_hide => button_show', animate('800ms linear'))
        ]),
    ]
})
export class BooksComponent implements OnInit, DoCheck {

    public page_left: boolean = false;
    public backgound_left: boolean = false;
    public synopsis_state: boolean = false;
    public content_show: boolean = false;
    public button_state: boolean = false;
    public book_width: boolean = false;

    public page_content: Array<Object> = [];
    public page_index: number = 0;
    public page_current: string;
    public synopsis_index: number = 100;
    
    public media_md: boolean = false;
    public scroll_state: boolean = false;
    
    public background_width: number;

    //----------------------------------------

    constructor(
        private dataService: DataService, 
        private location: Location, 
        private el: ElementRef
    ) {}

    //----------------------------------------

    ngOnInit() { 
        this.main_content();
        this.getPageTitle();
    }

    //----------------------------------------

    ngDoCheck() {
        window.matchMedia("(max-width: 991px)").matches ? this.media_md = true : this.media_md = false;

        if(!this.media_md) {
            setTimeout(() => {
                let book = this.el.nativeElement.querySelector('.at-book-cover');
                let half_width = book.offsetWidth / 2;
                this.background_width = book.getBoundingClientRect().left + half_width;
            }, 0);
        } else {
            this.background_width = window.innerWidth;
        }
    }

    //----------------------------------------
    
    get stateName() {
        return [
            this.page_left ? 'page_left' : '',                                      // stateName[0]
            this.backgound_left ? 'backgound_left' : '',                            // stateName[1]
            this.synopsis_state ? 'synopsis_show' : 'synopsis_hidden',              // stateName[2]
            this.content_show ? 'element_hide' : 'element_show',                    // stateName[3]
            this.button_state ? 'button_show' : 'button_hide',                      // stateName[4]
        ];
    }

    //----------------------------------------

    get_full_description(index):void {
        
        this.synopsis_index = index;

        this.page_left = !this.page_left;
        this.backgound_left = !this.backgound_left;
        this.synopsis_state = !this.synopsis_state;
        this.content_show = !this.content_show;
        this.button_state = !this.button_state;
        
        this.book_width = true;
        this.location.replaceState(`book/${this.page_current}`);
        this.dataService.book_on_scroll_state.subscribe(scroll_state => this.scroll_state = scroll_state);
    }
    
    //----------------------------------------

    getPageTitle():void {
        let object = this.page_content[this.page_index];
        let page_title = Object.values(object)[0];
        this.page_current = page_title.replace(/\s+/g, '-').toLowerCase();
    }

    //----------------------------------------

    main_content():void {
        this.page_content = [
            {
                title: "The scars of survival",
                subtitle: "A Collection  of Suffering  and Sacrifice",
                text: "There’s more to war than the front lines. With Russian forces invading Ukraine, the civilians running away from the combat have as many stories to share as the soldiers marching towards it.",
                circle_message: "Available on",
                active_book: 1,
                inactive_book: 2,
                button: true
            },
            {
                title: "The scars of survival2",
                subtitle: "A Collection  of Suffering  and Sacrifice",
                text: "Follow in the agonizing footsteps of a young girl as she grows into a woman, her development stunted and scarred by the war raging around her.",
                circle_message: "Coming soon to",
                active_book: 2,
                inactive_book: 1,
                button: false
            },
        ];
    }

}
