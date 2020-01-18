import {Component, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators, CommonProvider, MetaService} from '@app/shared';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-join-us',
    templateUrl: './join-us.component.html',
    styleUrls: ['./join-us.component.scss'],
    providers: [CommonProvider]
})
export class JoinUsComponent implements AfterViewInit, OnDestroy {
    
    @ViewChild('formReference', {static: false}) formReference: any;
    @ViewChild('inputResume', {static: false}) inputResume: any;
    @ViewChild('inputLetter', {static: false}) inputLetter: any;
    
    public resumeFileName: string = 'file name';
    public letterFileName: string = 'file name';
    
    public form: FormGroup;
    public imgNum: number = 1;
    public characterCount: boolean = false;
    public interval: any;
    
    public action: boolean = false;
    public messageData: Object = {};
    
    public selectOptions: Object = {
        'Administrative': 'Administrative',
        'Creative': 'Creative',
        'Customer Support': 'Customer Support',
        'Development & QA': 'Development & QA',
        'Marketing & Advertising': 'Marketing & Advertising',
        'Project Management': 'Project Management',
        'Sales': 'Sales',
        'IT': 'IT'
    };
    
    public phoneMask: Object = {
        mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    };
    
    constructor(
        private commonProvider: CommonProvider,
        private metaService: MetaService,
        private route: ActivatedRoute) {
        this.form = new FormGroup({
            type: new FormControl('join_our_team'),
            first_name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
            last_name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
            email: new FormControl('', [Validators.required, CustomValidators.validateEmail]),
            phone: new FormControl('', [Validators.required, CustomValidators.validatePhone]),
            address: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
            whyUs: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(500)]),
            whyYou: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(500)]),
            department: new FormControl('', [Validators.required]),
            letter: new FormControl(''),
            resume: new FormControl('')
        });
        
        this.imageSlider();
    }
    
    ngAfterViewInit(): void {
        this.metaService.addMetaTags({
            title: this.route.snapshot.data.meta['title'],
            description: this.route.snapshot.data.meta['description'],
            keywords: this.route.snapshot.data.meta['keywords']
        });
    }
    
    ngOnDestroy(): void {
        clearInterval(this.interval);
        this.metaService.removeMetaTags();
    }
    
    updateResumeFileName(): void {
        if (this.inputResume.nativeElement.files.length === 0) {
            return;
        }
        this.resumeFileName = this.inputResume.nativeElement.files[0]['name'];
        this.runFormValidation();
    }
    
    updateLetterFileName(): void {
        if (this.inputLetter.nativeElement.files.length === 0) {
            return;
        }
        this.letterFileName = this.inputLetter.nativeElement.files[0]['name'];
        this.runFormValidation();
    }
    
    resetForm(): void {
        let controls: any = this.form.controls;
        for (let controlName in controls) {
            if (controls.hasOwnProperty(controlName)) {
                controls[controlName].setValue('');
                controls[controlName].markAsPristine();
                controls['type'].setValue('join_our_team');
            }
        }
        this.resumeFileName = 'file name';
        this.letterFileName = 'file name';
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
            this.commonProvider.postRequest('send', this.formReference.nativeElement, 'form').then((response: any) => {
                if (response.status === 200) {
                    this.resetForm();
                    this.messageData = {
                        title: 'Thanks for getting in touch with us!',
                        text: 'One of our project managers will get back to you within 48 hours. Can’t wait? Call us at 1 (800) 682-9680.',
                        error: false
                    };
                    this.action = true;
                } else {
                    this.messageData = {
                        title: 'Oops',
                        text: response.content,
                        error: true
                    };
                    this.action = true;
                }
                
            });
        }
    }
    
    imageSlider(): void {
        var i;
        var prev;
        var rootClass = this;
        this.interval = setInterval(function() {
            i = Math.round(Math.random() * 30) + 1;
            i === prev ? i = i + 1 : false;
            rootClass.imgNum = i;
            prev = i;
        }, 900);
    }
    
    updateTextareaHeight(event: any): void {
        var elem = event.target;
        var elem_width = event.target.offsetWidth;
        var val_length = elem.value.length;
        
        var max_char = Math.ceil(elem_width / 8);
        var num_rows = Math.ceil(val_length / max_char);
        
        if (num_rows > 1) {
            elem.style.height = 'auto';
            elem.setAttribute('rows', num_rows);
            this.characterCount = true;
        } else {
            elem.style.height = 20 + 'px';
            this.characterCount = false;
        }
    }
}
