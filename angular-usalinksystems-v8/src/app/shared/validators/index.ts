import {FormControl} from '@angular/forms';

export class CustomValidators {

    static validateEmail(c: FormControl): any {
        let EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        return EMAIL_REGEXP.test(c.value) ? null : {
            invalidEmail: true
        };
    }


    static validatePhone(c: FormControl): any {
        let PHONE_REGEXP = /^\([\d]{3}\)[\s]{1}[\d]{3}\-[\d]{4}$/i;
        return PHONE_REGEXP.test(c.value) ? null : {
            invalidPhone: true
        };
    }


    static validateUrl(c: FormControl): any {
        let URL_REGEXP = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
        return URL_REGEXP.test(c.value) ? null : {
            invalidUrl: true
        };
    }

    static validateCharacters(c: FormControl): any {
        let CHAR_REGEXP = /^[A-Za-z\s\-]+$/;
        return CHAR_REGEXP.test(c.value) ? null : {
            invalidCharacters: true
        };
    }
}
