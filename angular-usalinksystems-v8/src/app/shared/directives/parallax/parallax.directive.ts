// ng2-parallax

import {Directive, ElementRef, Input} from '@angular/core';

/*
These are optional values you can include in the config object you can pass into the
directive for custom properties you want to use this with.  This tool can be used for
more than just the parallax effect, and it is able to transform anything about the
[parallaxElement] that you want to have bound to the scrolling of the nested element.
*/
export interface ParallaxConfig {
    // the css property (converted to camelCase) that you want changed along with the
    // value you want to assign to the css key; you should use ParallaxCss if you're
    // just defining one property without special values
    cssKey?: string;

    // this is used to define the css property you'd like to modify as you scroll
    // default is backgroundPositionY
    parallaxCss?: string;

    // ratio defining how fast, slow, or the direction of the changes on scrolling
    parallaxRatio?: number;

    // this is the initial value in pixels for the parallaxCss property you defined
    // before or, if you didn't define one, it defaults to 0
    parallaxInitVal?: number;

    // use this if you want the parallax effect only if the passed in statement is
    // truthy; default is boolean true
    parallaxIf?: any;

    // the id for the element on the page you'd like to track the scrolling of in the
    // case where the element is not available in the current component;
    // if no id is defined along with no scrollElement below,
    // it defaults to the scrolling of the body
    scrollerId?: string;

    // the upper constraint for the css transformation
    maxValue?: number;

    // the lower constraint for the css transformation
    minValue?: number;

    // the unit (e.g. 'px', 'em', '%', 'vh', etc.) you want for the parallax effect to use
    cssUnit?: string;

    // the element in the current component that you'd like the directive to track its
    // position as it scrolls;  gets assigned to the body if nothing is defined
    scrollElement?: HTMLElement;

    // the element that you'd like the effects from scrolling the scrollElement applied
    // to; essentially the element that moves as you scroll
    parallaxElement?: HTMLElement;

    // what you want to call it to find the particular instance of it if you need to debug
    name?: string;

    // optional callback function for additional actions during scaling
    cb?(): void;

    // arguments for optional callback entered into an array; for context-specific
    cb_args?: any[];

    // callback context in the case where the callback is context-specific
    cb_context?: any;
}

@Directive({
    selector: '[parallax], parallax'
})
export class Parallax {

    name: string = 'parallaxDirective';

    @Input() config: ParallaxConfig;
    // the following @Inputs are all part of the config object, which for
    // brevity's sake, you can do a bunch of operations in bulk by passing
    // in the config object; caveat for this is that angular 2 won't permit
    // more than 9 keys being passed in an object via the template
    @Input() cssKey: string = 'backgroundPosition';
    @Input() parallaxCss: string = 'backgroundPositionY';
    @Input() parallaxAxis: string = 'Y';
    @Input() parallaxRatio: number = -.7;
    @Input() parallaxInitVal: number = 0;
    @Input() parallaxIf: any = true;
    @Input() scrollerId: string;
    @Input() maxValue: number;
    @Input() minValue: number;
    @Input() cssUnit: string = 'px';
    @Input() cb;
    @Input() cb_context: any = null;
    @Input() cb_args: any[] = [];

    private cssValue: string;
    private isSpecialVal: boolean = false;
    private currentTransformValue: string;

    private hostElement: HTMLElement;
    @Input() scrollElement: any;
    @Input() parallaxElement: HTMLElement;

    private evaluateScroll(): void {
        // if (!this.parallaxIf) {
        //     console.log('prevented');
        //     return;
        // }

        // this.parallaxIf = false;

        let resultVal: string = '';
        let calcVal: number = 0;

        if (this.scrollElement instanceof Window)
            calcVal = this.scrollElement.scrollY * this.parallaxRatio + this.parallaxInitVal;
        else
            calcVal = this.scrollElement.scrollTop * this.parallaxRatio + this.parallaxInitVal;

        if (this.maxValue !== undefined && calcVal >= this.maxValue)
            calcVal = this.maxValue;
        else if (this.minValue !== undefined && calcVal <= this.minValue)
            calcVal = this.minValue;

        // added after realizing original setup wasn't compatible in Firefox debugger;
        if (this.cssKey === 'backgroundPosition') {
            if (this.parallaxAxis === 'X') {
                resultVal = calcVal + this.cssUnit + ' 0';
            } else {
                resultVal = '0 ' + calcVal + this.cssUnit;
            }
        } else if (this.isSpecialVal) {
            if (this.cssKey === 'transform') {
                resultVal += this.currentTransformValue + ' ' + this.cssValue + '(' + calcVal + this.cssUnit + ')';
            } else {
                resultVal = this.cssValue + '(' + calcVal + this.cssUnit + ')';
            }
        } else {
            resultVal = calcVal + this.cssUnit;
        }

        if (this.cb) {
            // console.log('this should be running')
            this.cb.apply(this.cb_context, this.cb_args);
        }
        //console.log(this.cssKey, resultVal)

        this.parallaxElement.style[this.cssKey] = resultVal;

        // this.parallaxIf = true;
    }

    ngOnInit(): void {
        let cssValArray: string[];

        // console.log('%s initialized on element', this.name, this.hostElement);
        // console.log(this);

        for (let prop in this.config) {
            if (!this.hasOwnProperty(prop)) {
                continue;
            }

            this[prop] = this.config[prop];
        }
        this.parallaxCss = this.parallaxCss ? this.parallaxCss : 'backgroundPositionY';
        if (this.parallaxCss.match(/backgroundPosition/i)) {
            if (this.parallaxCss.split('backgroundPosition')[1].toUpperCase() === 'X') {
                this.parallaxAxis = 'X';
            }

            this.parallaxCss = 'backgroundPosition';
        }

        cssValArray = this.parallaxCss.split(':');
        this.cssKey = cssValArray[0];
        this.cssValue = cssValArray[1];

        this.isSpecialVal = !!this.cssValue;
        if (!this.cssValue) this.cssValue = this.cssKey;

        this.parallaxRatio = +this.parallaxRatio;
        this.parallaxInitVal = +this.parallaxInitVal;

        this.parallaxElement = this.parallaxElement || this.hostElement;
        if (!this.scrollElement) {
            if (document.getElementById('parallaxScroll')) {
                this.scrollElement = document.getElementById('parallaxScroll');
            } else if (this.scrollerId) {
                this.scrollElement = document.getElementById(this.scrollerId);
                if (!this.scrollElement) {
                    console.warn(`The ID passed through the parallaxConfig ('${this.scrollerId}') object was not found in the document.  Defaulting to tracking the scrolling of the window.`);
                    this.scrollElement = window;
                }
            } else {
                this.scrollElement = window;
            }
        }

        if (this.cssKey === 'transform') {
            this.currentTransformValue = this.parallaxElement.style[this.cssKey];
        }

        let supportsPassive = false;
        try {
            let opts = Object.defineProperty({}, 'passive', {
                get: function (): void {
                    supportsPassive = true;
                }
            });
            window.addEventListener('test', null, opts);
        } catch (e) {
            console.log(e);
        }

        this.evaluateScroll();

        // this.scrollElement.addEventListener('scroll', requestAnimationFrame.bind(this, this.evaluateScroll.bind(this)));
        this.scrollElement.addEventListener('scroll', this.evaluateScroll.bind(this), supportsPassive ? {passive: true} : false);
    }

    constructor(element: ElementRef) {
        this.hostElement = element.nativeElement;
    }
}
