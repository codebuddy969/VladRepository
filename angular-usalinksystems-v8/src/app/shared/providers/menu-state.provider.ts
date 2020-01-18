import {BehaviorSubject} from 'rxjs';

export class MenuState {

    private static _instance: MenuState = new MenuState();
    private _state: boolean = false;
    public stateEmitter: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.state);

    constructor() {
        if (MenuState._instance) {
            throw new Error('Error: Instantiation failed: Use MenuState.getInstance() instead of new.');
        }
        MenuState._instance = this;
    }

    public static getInstance(): MenuState {
        return MenuState._instance;
    }

    public set state(value: boolean) {
        this._state = value;
        this.stateEmitter.next(value);
    }

    public get state(): boolean {
        return this._state;
    }

}
