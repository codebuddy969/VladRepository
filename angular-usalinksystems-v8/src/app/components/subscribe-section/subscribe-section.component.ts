import {Component, ElementRef, Input, ViewChild, AfterViewInit, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators, CommonProvider} from '@app/shared';

@Component({
    selector: 'app-subscribe-section',
    templateUrl: './subscribe-section.component.html',
    styleUrls: ['./subscribe-section.component.scss'],
    providers: [CommonProvider]
})
export class SubscribeSectionComponent implements AfterViewInit {
    
    @Input() headline;
    @ViewChild('formReference', {static: false}) formReference;
    @Output() returnEvent = new EventEmitter<any>(true);
    
    public form: FormGroup;
    public action: boolean = false;
    public messageData: Object = {};
    
    constructor(private commonProvider: CommonProvider, private el: ElementRef) {
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.minLength(2), CustomValidators.validateEmail]),
            name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')])
        });
    }
    
    ngAfterViewInit(): void {
        this.returnEvent.emit(this.el.nativeElement.querySelector('#subscribe'));
    }
    
    popup_message(): any {
        return this.messageData;
    }
    
    checkModal(event: boolean): void {
        event === false ? this.action = false : this.action = true;
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
            this.commonProvider.postRequest('subscribe', this.formReference.nativeElement, "form").then((response: any) => {
                response.status === 200 ? this.resetForm() : false;
                this.messageData = {title: response.title, text: response.content, error: false};
                this.action = true;
            });
        }
    }
}
