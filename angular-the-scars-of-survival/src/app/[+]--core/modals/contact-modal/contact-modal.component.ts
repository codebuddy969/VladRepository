import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-contact-modal',
    templateUrl: './contact-modal.component.html',
    styleUrls: ['./contact-modal.component.scss']
})
export class ContactModalComponent implements OnInit {

    @Input() action_value: boolean;
    @Input() modal_type: string;
    @Input() select_modal: boolean;
    @Output() returnEvent = new EventEmitter<boolean>(true);

    public check_select_modal: boolean = false;

    //----------------------------------------

    constructor() { }

    ngOnInit() { }

    //----------------------------------------

    checkModal($type) {
        this.modal_type = $type;
    }

    //----------------------------------------

    closeModal($event) {
        let modalElem = $event.target.classList.contains('modal');
        let crossElem = $event.target.classList.contains('modal__cross');
        if(modalElem || crossElem) {
            this.returnEvent.emit(this.action_value = false);
        }
    }

}
