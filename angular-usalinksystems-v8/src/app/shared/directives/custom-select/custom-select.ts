import {Component, Input, ViewChild, ElementRef} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
    selector: '[custom-select], custom-select',
    templateUrl: './custom-select.html',
    styleUrls: [
        './custom-select.scss'
    ]
})
export class CustomSelect {

    public currentOption: string = '';
    public optionsExpanded: boolean = false;

    @ViewChild('inputRef', {static: false}) inputRef: ElementRef;

    @Input('inputID') inputID: string;
    @Input('inputName') inputName: string;
    @Input('inputLabel') inputLabel: string;
    @Input('inputOptions') inputOptions: Object;
    @Input('inputOptionDual') inputOptionDual: boolean;
    @Input('inputFormControl') inputFormControl: FormControl;


    ngOnInit(): void {
        this.inputFormControl.registerOnChange((newValue) => {
            this.currentOption = newValue;
        });
    }


    selectOption(option: string): void {
        this.inputFormControl.setValue(option);
        this.hideOptions();
    }


    showOptions(): void {
        this.optionsExpanded = true;
    }


    hideOptions(): void {
        this.optionsExpanded = false;

        let classes = this.inputRef.nativeElement.classList;

        if (!classes.contains('ng-touched')) {
            classes.add('ng-touched');
        }

        if (classes.contains('ng-untouched')) {
            classes.remove('ng-untouched');
        }

        // this.inputRef.nativeElement.focus()
        // this.inputRef.nativeElement.blur()
    }

    toggleOptions(): void {
        if (this.optionsExpanded === true) {
            this.hideOptions();
        } else {
            this.showOptions();
        }
    }


    keys(value): Array<string> {
        return Object.keys(this.inputOptions);
    }

}
