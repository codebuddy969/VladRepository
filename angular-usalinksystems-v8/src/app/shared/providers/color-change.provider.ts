import {BehaviorSubject} from 'rxjs';

export class ColorChange {

    private static _instance: ColorChange = new ColorChange();
    private _color: string = 'red';
    public colorEmitter: BehaviorSubject<string> = new BehaviorSubject<string>(this.color);

    constructor() {
        if (ColorChange._instance) {
            throw new Error('Error: Instantiation failed: Use ColorChange.getInstance() instead of new.');
        }
        ColorChange._instance = this;
    }

    public static getInstance(): ColorChange {
        return ColorChange._instance;
    }

    public set color(value: string) {
        this._color = value;
        this.colorEmitter.next(value);
    }

    public get color(): string {
        return this._color;
    }

}
