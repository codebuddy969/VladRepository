import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { MENU_ITEMS1 } from './pages-menu1';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  menu;
  userType;
  constructor() {
    this.userType = localStorage.getItem('userType');
    if (this.userType === 'partner') {
      this.menu = MENU_ITEMS;
    }
    if (this.userType === 'member') {
      this.menu = MENU_ITEMS1;
    }
  }

}
