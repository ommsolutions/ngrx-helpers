import {Action} from "@ngrx/store";
import {INotification} from "../reducers/ui/ui.reducer";

export enum UiActionTypes {
    ADD_NOTIFICATION = "[UI] Add notification",
    CLOSE_MODALS = "[UI] Close modals"
}

export class AddNotification implements Action {
    readonly type = UiActionTypes.ADD_NOTIFICATION;
    public payload;

    constructor(notification: INotification) {
        this.payload = notification;
    }
}

export class CloseModals implements Action {
    readonly type = UiActionTypes.CLOSE_MODALS;
}

export type UiActions = AddNotification | CloseModals;
