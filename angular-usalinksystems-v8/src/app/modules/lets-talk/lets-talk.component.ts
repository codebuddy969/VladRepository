import {Component, AfterViewInit, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommonProvider, CustomValidators, MetaService} from '@app/shared';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-lets-talk',
    templateUrl: './lets-talk.component.html',
    styleUrls: ['./lets-talk.component.scss'],
    providers: [CommonProvider]
})
export class LetsTalkComponent implements AfterViewInit, OnDestroy {
    
    public action: boolean = false;
    public messageData: Object = {};
    public characterCount: boolean = false;
    public imgPath: string = '/assets/img/usa_profile';
    
    public form: FormGroup;
    public phoneMask: Object = {
        mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    };
    
    constructor(
        private commonProvider: CommonProvider,
        private metaService: MetaService,
        private route: ActivatedRoute
    ){
        this.form = new FormGroup({
            type: new FormControl('lets-talk'),
            first_name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
            last_name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
            email: new FormControl('', [Validators.required, CustomValidators.validateEmail]),
            url: new FormControl('', [Validators.required, CustomValidators.validateUrl]),
            phone: new FormControl('', [Validators.required, CustomValidators.validatePhone]),
            message: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(500)])
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
    
    popup_message(): any {
        return this.messageData;
    }
    
    checkModal($event): void {
        $event === false ? this.action = false : this.action = true;
    }
    
    updateTextareaHeight(event: any): void {
        var elem = event.target;
        var elem_width = event.target.offsetWidth;
        var val_length = elem.value.length;
        
        var max_char = Math.ceil(elem_width / 8);
        var num_rows = Math.ceil(val_length / max_char);
        
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
                controls['type'].setValue('lets-talk');
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
    
    submitForm($event: Event): void {
        $event.preventDefault();
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
