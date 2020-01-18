import { Component, OnInit } from '@angular/core';

import { DataService } from '../../[+]--shared/services/data.service';

@Component({
    selector: 'app-author',
    templateUrl: './author.component.html',
    styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {

    public modal_type: string;
    public action: boolean = false;

    public scroll_state: boolean = false;

    //----------------------------------------

    constructor( private dataService: DataService ) { }

    ngOnInit( ) { }

    //----------------------------------------

    checkModal($event, $type = 'email') {
        this.modal_type = $type;
        $event === false ? this.action = false : this.action = true;
    }

}
