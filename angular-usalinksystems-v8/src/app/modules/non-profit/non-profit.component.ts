import {Component, AfterViewInit, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommonProvider, CustomValidators, MetaService} from '@app/shared';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-non-profit',
    templateUrl: './non-profit.component.html',
    styleUrls: ['./non-profit.component.scss'],
    providers: [CommonProvider]
})
export class NonProfitComponent implements AfterViewInit, OnDestroy {
    
    public form: FormGroup;
    public action: boolean = false;
    public messageData: Object = {};
    public phoneMask: Object = {
        mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    };
    
    constructor(
        private commonProvider: CommonProvider,
        private metaService: MetaService,
        private route: ActivatedRoute
    ) {
        this.form = new FormGroup({
            type: new FormControl('non-profit'),
            first_name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
            last_name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
            organisation_name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
            business_license: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, CustomValidators.validateEmail]),
            phone: new FormControl('', [Validators.required, CustomValidators.validatePhone]),
            message: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(500)]),
        });
    }
    
    ngAfterViewInit(): void {
        this.metaService.addMetaTags({
            title: this.route.snapshot.data.meta['title'],
            description: this.route.snapshot.data.meta['description'],
            keywords: this.route.snapshot.data.meta['keywords']
        });
    }
    
    ngOnDestroy(): void {
        this.metaService.removeMetaTags();
    }
    
    resetForm(): void {
        let controls: any = this.form.controls;
        for (let controlName in controls) {
            if (controls.hasOwnProperty(controlName)) {
                controls[controlName].setValue('');
                controls[controlName].markAsPristine();
                controls['type'].setValue('subcontractor');
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
    
    popup_message() {
        return this.messageData;
    }
    
    checkModal($event): void {
        $event === false ? this.action = false : this.action = true;
    }
    
    submitForm(event: Event): void {
        event.preventDefault();
        this.runFormValidation();
        if (this.form.invalid) {
            this.messageData = {title: 'Oops', text: 'Please complete all fields', error: true};
            this.action = true;
        } else {
            this.commonProvider.postRequest('send', this.form.value).then((response: any) => {
                if (response.status === 200) {
                    this.resetForm();
                    this.messageData = {title: 'Thanks for getting in touch with us!', text: response.content, error: false};
                    this.action = true;
                } else {
                    this.messageData = {title: 'Oops', text: response.content, error: true};
                    this.action = true;
                }
            });
        }
    }
}
