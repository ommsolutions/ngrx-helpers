import {Action} from "@ngrx/store";
import {INotification} from "../reducers/ui/ui.reducer";

export enum UiActionTypes {
    ADD_NOTIFICATION = "[UI] Add notification"
}

export class AddNotification implements Action {
    readonly type = UiActionTypes.ADD_NOTIFICATION;
    public payload;
    constructor(notification: INotification) {
        this.payload = notification;
    }
}

export type UiActions = AddNotification;
