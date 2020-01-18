import {Component, AfterViewInit, OnDestroy, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CookieService} from 'angular2-cookie';
import {DOCUMENT} from '@angular/common';
import {CustomValidators, CommonProvider, MetaService} from '@app/shared';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-package-confirmation',
    templateUrl: './package-confirmation.component.html',
    styleUrls: ['./package-confirmation.component.scss'],
    providers: [CommonProvider, CookieService]
})
export class PackageConfirmationComponent implements AfterViewInit, OnDestroy {
    
    private window: Window;
    public action: boolean = false;
    public messageData: Object = {};
    public characterCount: boolean = false;
    
    public form: FormGroup;
    public phoneMask: Object = {
        mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    };
    public collection: any = this.cookieService.getObject('collection');
    
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private commonProvider: CommonProvider,
        private cookieService: CookieService,
        private metaService: MetaService,
        private route: ActivatedRoute
    ) {
        this.window = this.document.defaultView;
    }
    
    ngAfterViewInit(): void {
        this.form = new FormGroup({
            type: new FormControl('packages'),
            first_name: new FormControl('', [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(50),
                CustomValidators.validateCharacters
            ]),
            last_name: new FormControl('', [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(50),
                CustomValidators.validateCharacters
            ]),
            email: new FormControl('', [
                Validators.required,
                CustomValidators.validateEmail
            ]),
            url: new FormControl('', [
                Validators.required,
                CustomValidators.validateUrl
            ]),
            phone: new FormControl('', [
                Validators.required,
                CustomValidators.validatePhone
            ]),
            message: new FormControl('', [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(500)
            ])
        });
        this.metaService.addMetaTags({
            title: this.route.snapshot.data.meta['title'],
            description: this.route.snapshot.data.meta['description'],
            keywords: this.route.snapshot.data.meta['keywords']
        });
    }
    
    ngOnDestroy(): void {
        this.metaService.removeMetaTags();
    }
    
    popup_message(): Object {
        return this.messageData;
    }
    
    checkModal($event: boolean): void {
        $event === false ? this.action = false : this.action = true;
    }
    
    updateTextareaHeight(event: any): void {
        
        let elem = event.target;
        let elem_width = event.target.offsetWidth;
        let val_length = elem.value.length;
        
        let max_char = Math.ceil(elem_width / 8);
        let num_rows = Math.ceil(val_length / max_char);
        
        if (num_rows > 1) {
            elem.style.height = 'auto';
            elem.style.paddingTop = 15 + 'px';
            elem.setAttribute('rows', num_rows);
            this.characterCount = true;
        } else {
            elem.style.height = 36 + 'px';
            elem.style.paddingTop = 10 + 'px';
            elem.setAttribute('rows', 1);
            this.characterCount = false;
        }
    }
    
    resetForm(): void {
        let controls: any = this.form.controls;
        for (let controlName in controls) {
            if (controls.hasOwnProperty(controlName)) {
                controls[controlName].setValue('');
                controls[controlName].markAsPristine();
                controls['type'].setValue('packages');
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
        
        if (this.form.invalid) {
            this.messageData = {title: 'Oops', text: 'Please complete all fields', error: true};
            this.action = true;
        } else {
            
            const rootClass = this;
            const updated_option = {};
            
            Object.keys(this.collection.options).forEach(function(key: string): void {
                if (rootClass.collection.options[key] != null) {
                    updated_option[key] = rootClass.collection.options[key];
                }
            });
            
            this.collection.options = updated_option;
            
            this.form.value.package = JSON.stringify(this.collection);
            this.commonProvider.postRequest('send', this.form.value).then((data: any) => {
                if (data.status === 200) {
                    this.resetForm();
                    this.messageData = {title: 'Thanks for getting in touch with us!', text: data.content, error: false};
                    this.action = true;
                } else {
                    this.messageData = {title: 'Oops', text: data.content, error: true};
                    this.action = true;
                }
            });
        }
    }
}
