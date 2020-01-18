import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommonProvider, CustomValidators} from '@app/shared';

interface messageData {
    title?: string
    text?: string
    error?: boolean
}

@Component({
    selector: 'app-subscribe-modal',
    templateUrl: './subscribe-modal.component.html',
    styleUrls: ['./subscribe-modal.component.scss'],
    providers: [CommonProvider]
})
export class SubscribeModalComponent {
    
    @Input() headline;
    @Input() action_value: boolean;
    @Output() returnEvent = new EventEmitter<boolean>(true);
    @ViewChild('formReference', {static: false}) formReference;
    
    public form: FormGroup;
    public action: boolean = false;
    public finalClose: boolean = false;
    public messageData: messageData = {};
    
    constructor(private commonProvider: CommonProvider) {
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.minLength(2), CustomValidators.validateEmail]),
            name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*') ])
        });
    }
    
    closeModal($event: any): void {
        let modalElem = $event.target.classList.contains('popup');
        let crossElem = $event.target.classList.contains('popup__cross');
        if (modalElem || crossElem) {
            this.returnEvent.emit(this.action_value = false);
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
            this.commonProvider.postRequest('send', this.formReference.nativeElement, "form").then((data: any) => {
                if (data.status === 200) {
                    this.resetForm();
                }
                this.messageData = {title: data.title, text: data.content, error: false};
                this.action = true;
            });
        }
    }
}
