import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-alert-modal',
    templateUrl: './alert-modal.component.html',
    styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent {
    
    @Input() message: any;
    @Input() action_value: boolean;
    @Output() returnEvent = new EventEmitter<boolean>(true);
    
    closeModal($event) {
        let modalElem = $event.target.classList.contains('popup');
        let crossElem = $event.target.classList.contains('popup__cross');
        if(modalElem || crossElem) {
            this.returnEvent.emit(this.action_value = false);
        }
    }
}
