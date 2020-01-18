import { element } from "protractor";
import {
  Component,
  DoCheck,
  Renderer2,
  ElementRef,
  OnInit
} from "@angular/core";

@Component({
  selector: "app-media",
  templateUrl: "./media.component.html",
  styleUrls: ["./media.component.scss"]
})
export class MediaComponent implements OnInit, DoCheck {
  public action: boolean = false;
  public image_count: number;
  public media_md: boolean = false;
  public background_width: number;
  public is_mobile: boolean = false;

  //----------------------------------------

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  //----------------------------------------

  ngOnInit() {
    this.detectmob();
  }

  //----------------------------------------

  ngDoCheck(): void {
    window.matchMedia("(max-width: 991px)").matches
      ? (this.media_md = true)
      : (this.media_md = false);
    this.checkLeftDistance();
  }

  //----------------------------------------

  checkLeftDistance(): void {
    if (!this.media_md) {
      setTimeout(() => {
        let book = this.el.nativeElement.querySelector(".media__title");
        this.background_width = book.getBoundingClientRect().left - 15;
      }, 0);
    } else {
      this.background_width = window.outerWidth;
    }
  }

  //----------------------------------------

  detectmob() {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) { this.is_mobile = true } else { this.is_mobile = false }
  }

  //----------------------------------------

  checkModal($event, $image = 1): void {
    this.image_count = $image;
    $event === false ? (this.action = false) : (this.action = true);
  }
}
