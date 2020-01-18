import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NbToastrService} from "@nebular/theme";
import {authService} from "@pages/service/authService";

@Component({
    selector: 'ngx-member-registration',
    templateUrl: './member-registration.component.html',
    styleUrls: ['./member-registration.component.scss']
})
export class MemberRegistrationComponent implements OnInit {

    memberRegistration: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                public toastrService: NbToastrService,
                private crudService: authService) {
    }

    ngOnInit() {
        this.memberRegistration = this.formBuilder.group({
            accountNumber: ['', Validators.required],
            accountCardID: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
        });
    }

    register() {
        if (this.memberRegistration.invalid) {
            return this.memberRegistration.invalid;
        } else {
            const memberValue = {
                'firstname': this.memberRegistration.value.firstName,
                'lastname': this.memberRegistration.value.lastName,
                'email': this.memberRegistration.value.email,
                'phonenumber': this.memberRegistration.value.phone,
                'accountnumber': this.memberRegistration.value.accountNumber,
                'cardid': this.memberRegistration.value.accountCardID,
            };
            this.crudService.postRequest("registerMember", memberValue).subscribe((result: any) => {
                if (result.success) {
                    this.router.navigate(['/auth/member-login']);
                } else {
                    this.toastrService.show('Something went wrong please try again', 'Registration failed', {status: "danger", duration: 5000});
                }
            });
        }
    }

}
