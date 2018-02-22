import {MatSnackBarConfig} from "@angular/material";
import {UiActionTypes, UiActions} from "../../actions/ui.actions";

export interface INotification {
    message: string;
    action?: string;
    config?: MatSnackBarConfig;
}

export interface IState {
    notifications: INotification[];
}

export const initialState: IState = {
    notifications: []
};

export function reducer(state: IState = initialState, action: UiActions): IState {
    switch (action.type) {
        case UiActionTypes.ADD_NOTIFICATION: {
            return {
                notifications: [...state.notifications, action.payload]
            };
        }

        default: {
            return state;
        }
    }
}

export const selectLatestNotification = (state: IState) => state.notifications.length > 0
    ? state.notifications[state.notifications.length - 1]
    : undefined;
