export class IsMobile {

    static Android(): boolean {
        return !!navigator.userAgent.match(/Android/i);
    }

    static BlackBerry(): boolean {
        return !!navigator.userAgent.match(/BlackBerry/i);
    }

    static iOS(): boolean {
        return !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
    }

    static Opera(): boolean {
        return !!navigator.userAgent.match(/Opera Mini/i);
    }

    static Windows(): boolean {
        return !!(navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i));
    }

    static any(): boolean {
        return !!(this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
    }

}
