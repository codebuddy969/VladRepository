import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {authService} from "@pages/service/authService";
import {NbToastrService} from "@nebular/theme";
import {Router} from '@angular/router';

@Component({
    selector: 'ngx-partner-registration',
    templateUrl: './partner-registration.component.html',
    styleUrls: ['./partner-registration.component.scss']
})
export class PartnerRegistrationComponent implements OnInit {

    partnerRegistration: FormGroup;

    constructor(private formBuilder: FormBuilder,
                public router: Router,
                public toastrService: NbToastrService,
                public crudService: authService) {
    }

    ngOnInit() {
        this.partnerRegistration = this.formBuilder.group({
            accountPartnerId: ['', Validators.required],
            accessId: ['', Validators.required],
            companyName: ['', Validators.required],
        });
    }

    register() {
        if (this.partnerRegistration.invalid) {
            return this.partnerRegistration.invalid;
        } else {
            const partnerValue = {
                'partnerid': this.partnerRegistration.value.accountPartnerId,
                'cardid': this.partnerRegistration.value.accessId,
                'name': this.partnerRegistration.value.companyName,
            };
            this.crudService.postRequest("registerPartner", partnerValue).subscribe((result: any) => {
                if (result.success) {
                    this.router.navigate(['/auth/partner-login']);
                } else {
                    this.toastrService.show('Something went wrong please try again', 'Registration failed', {status: "danger", duration: 5000});
                }
            });
        }
    }
}
