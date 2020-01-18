import { Component, OnInit, HostListener, ElementRef, AfterViewChecked } from '@angular/core';
import { FacebookService, InitParams } from 'ngx-facebook';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, AfterViewChecked {

  public modal_type: string;
  public action: boolean = false;

  public facebook_width: number = 230;
  public facebook_refresh;

  //----------------------------------------

  constructor( private fb: FacebookService, private el: ElementRef ) { }

  //----------------------------------------

  ngOnInit() {
    this.facebookAPI();
  }

  ngAfterViewChecked(): void {
    let rootClass = this;
    setTimeout(function(){
      rootClass.onResize();
    }, 0);
  }

  @HostListener('window:resize')
  onResize(): void {
    let rootClass = this;
    let container_width = this.el.nativeElement.querySelector('.social__facebook').offsetWidth;

    clearTimeout(this.facebook_refresh);
    this.facebook_refresh = setTimeout(function(){ 
      rootClass.facebook_width = container_width;
      rootClass.facebookAPI();
    }, 100);
  }

  //----------------------------------------

  facebookAPI(): void {
    let initParams: InitParams = {
      appId: '1023399241165954',
      xfbml: true,
      version: 'v3.1'
    };
 
    this.fb.init(initParams);
  }

  //----------------------------------------

  checkModal($event, $type = 'email'): void {
    this.modal_type = $type;
    $event === false ? this.action = false : this.action = true;
  }

}
