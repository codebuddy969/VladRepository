import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NbToastrService} from "@nebular/theme";
import {NbLoginComponent} from '@nebular/auth';
import {authService} from "../../service/authService";

@Component({
    selector: 'ngx-partner-login',
    templateUrl: './partner-login.component.html',
    styleUrls: ['./partner-login.component.scss']
})
export class PartnerLoginComponent extends NbLoginComponent implements OnInit {

    partnerLogin: FormGroup;

    constructor(private formBuilder: FormBuilder,
                public router: Router,
                public toastrService: NbToastrService,
                public authservice: authService) {
        super(null, null, null, router);
    }

    ngOnInit(): void {
        this.partnerLogin = this.formBuilder.group({
            accountPartnerId: ['', Validators.required],
            accessId: ['', Validators.required],
        });
    }

    login(): any {
        this.submitted = true;
        if (this.partnerLogin.invalid) {
            return this.partnerLogin.invalid;
        } else {
            localStorage.removeItem('member');
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
                    this.toastrService.show(response.error,'Login failed',{status: "danger", duration: 5000});
                } else {
                    this.router.navigate(['/pages/dashboard']);
                }
            });
        }
    }
}
