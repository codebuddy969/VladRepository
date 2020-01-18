import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './[+]--shared/services/data.service';
import { trigger, animate, transition, style, query } from '@angular/animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('routeAnimation', [
            transition('* => *', [
                query(
                    ':enter',
                    [style({ left: 100 + '%', zIndex: '4'})],
                    { optional: true }
                ),
                query(
                    ':leave',
                    [style({}), animate('0.2s', style({}))],
                    { optional: true }
                ),
                query(
                    ':enter',
                    [style({ backgroundColor: '#fff' }), animate('0.3s ease-in', style({ left: 0 }))],
                    { optional: true }
                )
            ])
        ])
    ]
})
export class AppComponent implements OnInit  {

    public navbar_state: boolean = false;    
    public nav_state: boolean = false;
    public menu_state: string;
    public scroll_state: boolean = false;
    public isIE: boolean = false;

    public modal_type: string;
    public action: boolean = false;
    public select_modal: boolean = false;    

    //----------------------------------------

    constructor( private router: Router, private dataService: DataService ) { }

    //----------------------------------------

    ngOnInit() {
        this.move_menu();
        this.dataService.current_state.subscribe(menu_state => this.menu_state = menu_state);
        this.dataService.book_on_scroll_state.subscribe(scroll_state => this.scroll_state = scroll_state);

        this.router.routeReuseStrategy.shouldReuseRoute = () => { return false };
        this.detectIE();
    }
    

    //----------------------------------------

    @HostListener('window:resize')
    onResize() { 
        this.move_menu(); 
    }

    //----------------------------------------

    move_menu() {
        const mw = window.matchMedia("(max-width: 767px)");
        mw.matches ? (this.nav_state = true) : (this.nav_state = false);
    }

    //----------------------------------------

    switch_navbar(event) {
        if (event.target.scrollTop > 50) {
            this.navbar_state = true;
            this.dataService.attachBookToTop(true);
        } else if (event.target.scrollTop <= 50) {
            this.navbar_state = false;
            this.dataService.attachBookToTop(false);
        }
        
        if ( event.target.scrollTop > 141 ) {
            this.dataService.attachBookToTop(true);
        } else if ( event.target.scrollTop <= 141 ) {
            this.dataService.attachBookToTop(false);
        }
    }
    
    //----------------------------------------
    
    detectIE() {
        let ua = window.navigator.userAgent;

        let msie = ua.indexOf('MSIE ');
        let trident = ua.indexOf('Trident/');
        let edge = ua.indexOf('Edge/');
        
        if (msie > 0 || trident > 0 || edge > 0) {
            this.isIE = true;
        }

        return false; // other browsers
    }

    //----------------------------------------

    checkModal($event, $type = 'email') {
        this.modal_type = $type;
        this.modal_type === 'select' ? this.select_modal = true : this.select_modal = false;
        $event === false ? this.action = false : this.action = true;
    }
}