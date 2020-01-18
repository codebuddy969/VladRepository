import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-blog-comment',
    templateUrl: './blog-comment.component.html',
    styleUrls: ['./blog-comment.component.scss']
})
export class BlogCommentComponent implements OnInit {

    @Input() action_value: boolean;
    @Output() returnEvent = new EventEmitter<boolean>(true);

    constructor() { }

    ngOnInit() { }

    closeModal($event) {
        let modalElem = $event.target.classList.contains('modal');
        let crossElem = $event.target.classList.contains('modal__cross');
        if(modalElem || crossElem) {
            this.returnEvent.emit(this.action_value = false);
        }
    }

}
