import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'ngx-one-column-layout',
    styleUrls: ['./one-column.layout.scss'],
    template: `
        <nb-layout windowMode>
            <nb-layout-header fixed>
                <ngx-header></ngx-header>
            </nb-layout-header>

            <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive>
                <div class="menu-logo">
                    <img src="/assets/images/logo/{{imageName}}">
                </div>
                <ng-content select="nb-menu"></ng-content>
            </nb-sidebar>

            <nb-layout-column>
                <ng-content select="router-outlet"></ng-content>
            </nb-layout-column>

            <nb-layout-footer fixed>
                <ngx-footer></ngx-footer>
            </nb-layout-footer>
        </nb-layout>
    `,
})
export class OneColumnLayoutComponent implements OnInit{

    imageName;
    memberInfo;
    partnerInfo;

    ngOnInit() {
        this.setLogoForMember();
        this.setLogoForPartner();
    }

    setLogoForMember(): void {
        this.memberInfo = JSON.parse(localStorage.getItem('member'));
        if(this.memberInfo !== null && this.memberInfo.accountnumber) {
            switch (this.memberInfo.accountnumber) {
                case '222222':
                    this.imageName = "hilton-honors-logo.jpg";
                    break;
                case '333333':
                    this.imageName = "delta-logo.png";
                    break;
                default:
                    this.imageName = "elara-logo-2.jpg";
            }
        }
    }

    setLogoForPartner(): void {
        this.partnerInfo = JSON.parse(localStorage.getItem('partner'));
        if(this.partnerInfo !== null && this.partnerInfo.partnerid) {
            switch (this.partnerInfo.partnerid) {
                case '222222':
                    this.imageName = "hilton-honors-logo.jpg";
                    break;
                case '333333':
                    this.imageName = "delta-logo.png";
                    break;
                default:
                    this.imageName = "elara-logo.jpg";
            }
        }
    }
}
