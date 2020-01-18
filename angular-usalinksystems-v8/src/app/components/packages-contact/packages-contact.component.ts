import {Component, EventEmitter, Input, Output, ViewChild, Inject, Renderer2, AfterViewInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators, CommonProvider} from '@app/shared';
import {DOCUMENT} from '@angular/common';

@Component({
    selector: 'app-packages-contact',
    templateUrl: './packages-contact.component.html',
    styleUrls: ['./packages-contact.component.scss'],
    providers: [CommonProvider]
})
export class PackagesContactComponent implements AfterViewInit {
    
    @Input() headline;
    @Input() action_value: boolean;
    @Output() returnEvent = new EventEmitter<boolean>(true);
    
    @ViewChild('formReference', {static: false}) formReference;
    public form: FormGroup;
    public action: boolean = false;
    public messageData: any = {};
    
    public window: Window;
    public bodyscrollX: number;
    public bodyscrollY: number;
    
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private CommonProvider: CommonProvider,
        private renderer: Renderer2
    ) {
        this.form = new FormGroup({
            type: new FormControl('contact-sonia'),
            email: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
                CustomValidators.validateEmail
            ]),
            first_name: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50),
                CustomValidators.validateCharacters
            ]),
            last_name: new FormControl('empty'),
            phone: new FormControl('(111) 111-1111'),
            message: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(500)
            ])
        });
        this.window = this.document.defaultView;
    }
    
    ngAfterViewInit(): void {
        this.preventBodyFromScrolling(true);
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
                controls['type'].setValue('contact-sonia');
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
            this.CommonProvider.postRequest('send', this.form.value).then((data: any) => {
                if (data.status === 200) {
                    this.resetForm();
                }
                this.action = true;
                this.messageData = {title: data.content, text: '', error: false};
            });
        }
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
}
