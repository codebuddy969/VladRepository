import {Inject, Injectable, HostListener} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    imageSize;
    window: Window;

    constructor(@Inject(DOCUMENT) private document: any) {
        this.window = this.document.defaultView;
    }

    setImageTypes(images) {
        const ua = this.window.navigator.userAgent;
        if (this.window.matchMedia("(min-width: 991px)").matches) {
            this.imageSize = "large";
        }
        if (this.window.matchMedia("(max-width: 991px)").matches) {
            this.imageSize = "medium";
        }
        if (this.window.matchMedia("(max-width: 575px)").matches) {
            this.imageSize = "small";
        }
        if (ua.indexOf('MSIE ') > 0 || ua.indexOf('Trident/') > 0 || ua.indexOf('Edge/') > 0) {
            Object.keys(images).forEach((item) => {
                images[item].name = images[item].original + images[item].sizes[this.imageSize] + images[item].extension;
            });
        } else {
            Object.keys(images).forEach((item) => {
                images[item].name = images[item].original + images[item].sizes[this.imageSize] + ".webp";
            });
        }
        return images;
    }
}