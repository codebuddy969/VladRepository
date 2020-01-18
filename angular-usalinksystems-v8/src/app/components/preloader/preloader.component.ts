import {Component, Inject, OnInit, OnDestroy, Renderer2} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent implements OnInit, OnDestroy {
  
  private window: Window;
  
  constructor(
      @Inject(DOCUMENT) private document: Document,
      private renderer: Renderer2
  ) { this.window = this.document.defaultView; }

  ngOnInit() {
    this.renderer.setStyle(this.document.body,'position','fixed');
  }
  
  ngOnDestroy(): void {
    this.renderer.setStyle(this.document.body,'position','static');
  }
  
}
