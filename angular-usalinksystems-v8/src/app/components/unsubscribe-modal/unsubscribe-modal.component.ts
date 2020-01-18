import {Component, OnInit, EventEmitter, Inject, Input, Output, Renderer2, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommonProvider, CustomValidators} from '@app/shared';
import {DOCUMENT} from '@angular/common';

interface messageData {
    title?: string
    text?: string
    error?: boolean
}

@Component({
    selector: 'app-unsubscribe-modal',
    templateUrl: './unsubscribe-modal.component.html',
    styleUrls: ['./unsubscribe-modal.component.scss'],
    providers: [CommonProvider]
})
export class UnsubscribeModalComponent implements OnInit {
    
    @ViewChild('formReference', {static: false}) formReference;
    @Input() action_value: boolean;
    @Output() returnEvent = new EventEmitter<boolean>(true);
    
    public window: Window;
    public form: FormGroup;
    public bodyscrollX: number;
    public bodyscrollY: number;
    public action: boolean = false;
    public messageData: messageData = {};
    
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private renderer: Renderer2,
        private commonProvider: CommonProvider
    ) {
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.minLength(2), CustomValidators.validateEmail])
        });
        this.window = this.document.defaultView;
    }
    
    ngOnInit(): void {
        this.preventBodyFromScrolling(true);
    }
    
    preventBodyFromScrolling(status: boolean): void {
        if (status) {
            this.bodyscrollX = this.window.scrollX;
            this.bodyscrollY = this.window.scrollY;
            this.renderer.addClass(this.document.body, 'block-scroll');
            this.renderer.setStyle(this.document.body, 'top', -this.bodyscrollY.toString() + 'px');
        } else {
            this.renderer.removeClass(this.document.body, 'block-scroll');
            this.window.scrollBy(this.bodyscrollX, this.bodyscrollY);
        }
    }
    
    closeModal($event: any): void {
        let modalElem = $event.target.classList.contains('popup');
        let crossElem = $event.target.classList.contains('popup__cross');
        if (modalElem || crossElem) {
            this.returnEvent.emit(this.action_value = false);
            this.preventBodyFromScrolling(false);
        }
    }
    
    resetForm(): void {
        let controls: any = this.form.controls;
        for (let controlName in controls) {
            if (controls.hasOwnProperty(controlName)) {
                controls[controlName].setValue('');
                controls[controlName].markAsPristine();
            }
        }
    }
    
    runFormValidation(): void {
        let controls: any = this.form.controls;
        for (let controlName in controls) {
            if (controls.hasOwnProperty(controlName)) {
                controls[controlName].markAsDirty();
            }
        }
    }
    
    submitForm(event: Event): void {
        event.preventDefault();
        this.runFormValidation();
        if (!this.form.invalid) {
            this.commonProvider.postRequest('unsubscribe', this.formReference.nativeElement, "form").then((response: any) => {
                response.status === 200 ? this.resetForm() : false;
                this.messageData = {title: response.title, text: response.content, error: false};
                this.action = true;
            });
        }
    }
}
