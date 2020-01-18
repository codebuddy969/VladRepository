import { Component, OnInit, DoCheck, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Location } from '@angular/common';

import { DataService } from '../../[+]--shared/services/data.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [
        trigger('pageState', [
            state('page_left', style({
                left: '40px',
                right: '0'
            })),
            transition('* => *', animate('800ms linear'))
        ]),
        trigger('infoState', [
            state('info_show', style({
                opacity: '1',
                left: '15px',
            })),
            state('info_hidden', style({
                opacity: '0',
                left: '-100%',
                position: 'absolute'
            })),
            transition('info_show => info_hidden', animate('800ms linear'))
        ]),
        trigger('synopsisState', [
            state('synopsis_hidden', style({
                opacity: '1',
                display: 'block',
                transition: 'opacity 0.35s linear'
            })),
            state('synopsis_show', style({
                opacity: '0',
                display: 'none',
            }))
        ]),
        trigger('bookState', [
            state('book_state', style({
                right: '-20%',
                opacity: '0'
            })),
            transition('* => *', animate('800ms linear'))
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
        ])
    ]
})

export class HomeComponent implements OnInit, DoCheck {

    public page_left: boolean = false;
    public info_left: boolean = false;
    public synopsis_state: boolean = false;
    public book_state: boolean = false;
    public button_state: boolean = false;
    public background_state: boolean = false;
    
    public page_content: Array<Object> = [];
    public page_index: number = 0;
    public page_current: string;
    public media_md: boolean = false;
    
    public scroll_state: boolean = false;
    public stop_animation: boolean = false;

    public background_width: number;

    private swipeCoord: [number, number];
    private swipeTime: number;    

    //----------------------------------------

    constructor( 
        private dataService: DataService, 
        private location: Location,
        private el: ElementRef
    ) {}

    //----------------------------------------

    ngOnInit(): void {
        this.main_content();
        this.getPageTitle();   
    }

    //----------------------------------------

    ngDoCheck(): void {
        window.matchMedia("(max-width: 991px)").matches ? this.media_md = true : this.media_md = false;
        this.checkLeftDistance();
      }

    //----------------------------------------

    checkLeftDistance(): void {
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
    
    InfoAnimationTrigger(): void {
        this.media_md ? this.stop_animation = !this.stop_animation : this.stop_animation = false;
    }

    //----------------------------------------
    
    get stateName() {
        return [
            this.page_left ? 'page_left' : '',                                  // stateName[0]
            this.info_left ? 'info_hidden' : 'info_show',                       // stateName[1]
            this.synopsis_state ? 'synopsis_hidden' : 'synopsis_show',          // stateName[2]
            this.book_state ? 'book_state' : '',                                // stateName[3]
            this.button_state ? 'button_show' : 'button_hide',                  // stateName[4]
        ];
    }

    //----------------------------------------
    
    get_full_description():void {
        this.page_left = !this.page_left;
        this.info_left = !this.info_left;
        this.synopsis_state = !this.synopsis_state;
        this.book_state = !this.book_state;
        this.button_state = !this.button_state;
        this.background_state = !this.background_state;
        
        this.location.replaceState(`book/${this.page_current}`);
        this.dataService.book_on_scroll_state.subscribe(scroll_state => this.scroll_state = scroll_state);
    }

    //----------------------------------------

    replace_content(bullet_index): void {
        this.page_index === this.page_content.length ? this.page_index = 0 : this.page_index = bullet_index;
        this.getPageTitle();
    }

    //----------------------------------------
    
    next_book(index): void {
        index >= this.page_content.length - 1 ? this.page_index = 0 : this.page_index = this.page_index + 1;
    }

    //----------------------------------------
    
    getPageTitle(): void /* Function to replace url on the page */ {
        let object = this.page_content[this.page_index];
        let page_title = Object.values(object)[0];
        this.page_current = page_title.replace(/\s+/g, '-').toLowerCase();
    }

    //----------------------------------------
    
    swipe(e: TouchEvent, when: string): void {

        const coord: [number, number] = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
        const time = new Date().getTime();

        if (when === 'start') {
            this.swipeCoord = coord;
            this.swipeTime = time;
        }

        else if (when === 'end') {
            const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
            const duration = time - this.swipeTime;

            if (duration < 1000 && Math.abs(direction[0]) > 30 && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) {
                const swipe = direction[0] < 0 ? 'next' : 'prev';
                if(swipe === 'next') {
                    this.page_index = this.page_index + 1;
                    this.page_index === 2 ? (this.page_index = 0) : false;
                } else if (swipe === 'prev') {
                    this.page_index = this.page_index - 1;
                    this.page_index === -1 ? (this.page_index = 1) : false;
                }    
            }
        }
    }

    //----------------------------------------

    main_content():void {
        this.page_content = [
            {
                title: "The scars of survival",
                subtitle: "A Collection  of Suffering  and Sacrifice",
                text: "Follow in the agonizing footsteps of a young girl as she grows into a woman, her development stunted and scarred by the war raging around her.",
                background: "assets/images/home-background-1.jpg",
                circle_message: "Available on",
                active_book: 1,
                inactive_book: 2,
                button: true
            },
            {
                title: "The scars of survival2",
                subtitle: "A Collection  of Suffering  and Sacrifice",
                text: "Follow in the agonizing footsteps of a young girl as she grows into a woman, her development stunted and scarred by the war raging around her.",
                background: "assets/images/home-background-2.jpg",
                circle_message: "Coming soon to",
                active_book: 2,
                inactive_book: 1,
                button: false
            },
        ];
    }
}
