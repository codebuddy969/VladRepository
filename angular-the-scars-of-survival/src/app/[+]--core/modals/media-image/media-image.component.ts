import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-media-image",
  templateUrl: "./media-image.component.html",
  styleUrls: ["./media-image.component.scss"]
})
export class MediaImageComponent implements OnInit {

  @Input()
  action_value: boolean;
  @Input()
  image_count: number = 1;
  @Output()
  returnEvent = new EventEmitter<boolean>(true);

  private swipeCoord: [number, number];
  private swipeTime: number;

  constructor() {}

  ngOnInit() { }

  switch_image($direction): void {
    if ($direction === "next") {
      this.image_count = this.image_count + 1;
      this.image_count === 18 ? (this.image_count = 17) : false;
    } else {
      this.image_count = this.image_count - 1;
      this.image_count === 0 ? (this.image_count = 1) : false;
    }
  }

  swipe(e: TouchEvent, when: string): void {
    const coord: [number, number] = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
    const time = new Date().getTime();

    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    }

    else if (when === 'end') {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = time - this.swipeTime;

      if (duration < 1000 && Math.abs(direction[0]) > 30 && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) {
          const swipe = direction[0] < 0 ? 'next' : 'prev';
          if(swipe === 'next') {
            this.image_count = this.image_count + 1;
            this.image_count === 18 ? (this.image_count = 17) : false;
          } else if (swipe === 'prev') {
            this.image_count = this.image_count - 1;
            this.image_count === 0 ? (this.image_count = 1) : false;
          }    
        }
    }
  }

  closeModal($event) {
    let modalElem = $event.target.classList.contains("modal");
    let crossElem = $event.target.classList.contains("modal__cross");
    if (modalElem || crossElem) {
      this.returnEvent.emit((this.action_value = false));
    }
  }
}
