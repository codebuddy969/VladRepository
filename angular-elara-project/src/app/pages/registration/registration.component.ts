import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { authService } from '../service/authService';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {

  userType = '';
  partnerRegistration: FormGroup;
  memberRegistration: FormGroup;
  submitted =  false;

  constructor(private formBuilder: FormBuilder,
              public router: Router,
              public authservice: authService) { }

  ngOnInit() {
    this.partnerRegistration = this.formBuilder.group({
      accountPartnerId: ['', Validators.required],
      accessId: ['', Validators.required],
      companyName: ['', Validators.required],
    });
    this.memberRegistration = this.formBuilder.group({
      accountNumber: ['', Validators.required],
      accountCardID: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  onChanges(value) {
    if (value === 'member') {
      this.memberRegistration.reset();
    }
    if ( value === 'partner') {
      this.partnerRegistration.reset();
    }
  }

  register() {
    if ( this.userType === 'partner') {
      this.submitted = true;
      if (this.partnerRegistration.invalid) {
        return this.partnerRegistration.invalid;
      } else {
        const partnerValue = {
          'partnerid': this.partnerRegistration.value.accountPartnerId,
          'cardid': this.partnerRegistration.value.accessId,
          'name': this.partnerRegistration.value.companyName,
        };
        this.submitted = false;
        this.partnerRegistration.reset();
        this.authservice.partnerRegistration(partnerValue).subscribe((data: any) => {
          if (data) {
            this.router.navigate(['/auth/login']);
          }
        });
        this.router.navigate(['/auth/login']);
      }
    }
    if (this.userType === 'member') {
      this.submitted = true;
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
        this.authservice.memberRegistration(memberValue).subscribe((data: any) => {
          if (data) {
            this.router.navigate(['/auth/login']);
          }
        });
        this.router.navigate(['/auth/login']);
      }
    }
  }
}
