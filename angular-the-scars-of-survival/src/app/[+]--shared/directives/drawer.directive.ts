import { Directive, ElementRef, HostListener } from "@angular/core";
import { DataService } from "../services/data.service";

@Directive({
    selector: "[appDrawer]"
})
export class DrawerDirective {

    public state: string;
    public media_xs: boolean = false;

    constructor( private el: ElementRef, private data: DataService ) {
        this.data.current_state.subscribe(state => (this.state = state));
    }

    checkWindowSize(): void {
        const wmatch = window.matchMedia("(max-width: 767px)").matches;
        if (wmatch) {
            this.media_xs = true;
        } else {
            this.media_xs = false;
            this.data.changeBurgerState("false");
        }
    }

    @HostListener("window:resize") 
    public onResize(): void {
        this.checkWindowSize();
    }

    @HostListener("document:click", ["$event", "$event.target"])
    public onClick(event: MouseEvent, targetElement: HTMLElement): void {

        if (!targetElement) { return }

        this.checkWindowSize();
        
        if (this.media_xs) {
            const clickedInside = this.el.nativeElement.contains(targetElement);
            const link_element = targetElement.classList.contains("navigation__link");
            const burger_element = targetElement.classList.contains("burger-toggler-block");
            const sidebar_element = targetElement.classList.contains("drawer");

            if ( link_element || burger_element || sidebar_element || clickedInside ) {
                if (burger_element && this.state === "opened") {
                    this.data.changeBurgerState("false");
                } else {
                    this.data.changeBurgerState("opened");
                }
                if (sidebar_element) {
                    this.data.changeBurgerState("opened");
                }
                if (link_element) {
                    this.data.changeBurgerState("false");
                }
            } else {
                this.data.changeBurgerState("false");
            }
        }
    }
}
