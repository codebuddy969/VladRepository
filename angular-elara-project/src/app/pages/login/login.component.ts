import {Component, OnInit} from '@angular/core';
import {NbLoginComponent} from '@nebular/auth';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {authService} from "../service/authService";

@Component({
    selector: 'ngx-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends NbLoginComponent implements OnInit {

    userType = '';
    memberLogin: FormGroup;
    partnerLogin: FormGroup;
    submitted = false;

    constructor(private formBuilder: FormBuilder,
                public router: Router,
                public authservice: authService) {
        super(null, null, null, router);
    }

    ngOnInit() {
        this.memberLogin = this.formBuilder.group({
            accountNumber: ['', Validators.required],
            accessId: ['', Validators.required],
        });
        this.partnerLogin = this.formBuilder.group({
            accountPartnerId: ['', Validators.required],
            accessId: ['', Validators.required],
        });
    }

    onChanges(value) {
        if (value === 'member') {
            this.memberLogin.reset();
        }
        if (value === 'partner') {
            this.partnerLogin.reset();
        }
    }

    login() {
        if (this.userType === 'member') {
            this.submitted = true;
            if (this.memberLogin.invalid) {
                return;
            } else {
                localStorage.setItem('userType', 'member');
                const MemberValue = {
                    'accountnumber': this.memberLogin.value.accountNumber,
                    'cardid': this.memberLogin.value.accessId,
                };
                localStorage.setItem('member', JSON.stringify(MemberValue));
                this.submitted = false;
                this.memberLogin.reset();
                this.authservice.memberSignIn(MemberValue).subscribe((response: any) => {
                    if(response.error) {
                        alert(response.error);
                    } else {
                        this.router.navigate(['/pages/dashboard']);
                    }
                });
            }
        }
        if (this.userType === 'partner') {
            this.submitted = true;
            if (this.partnerLogin.invalid) {
                return this.partnerLogin.invalid;
            } else {
                localStorage.setItem('userType', 'partner');
                const partnerValue = {
                    'partnerid': this.partnerLogin.value.accountPartnerId,
                    'cardid': this.partnerLogin.value.accessId,
                };
                localStorage.setItem('partner', JSON.stringify(partnerValue));
                this.submitted = false;
                this.partnerLogin.reset();
                this.authservice.partnerSignIn(partnerValue).subscribe((response: any) => {
                    if(response.error) {
                        alert(response.error);
                    } else {
                        this.router.navigate(['/pages/dashboard']);
                    }
                });
            }
        }
    }

}
