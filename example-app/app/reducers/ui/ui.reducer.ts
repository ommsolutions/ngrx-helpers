import {MatSnackBarConfig} from "@angular/material";
import {UiActionTypes, UiActions} from "../../actions/ui.actions";

export interface INotification {
    message: string;
    action?: string;
    config?: MatSnackBarConfig;
}

export interface IState {
    notifications: INotification[];
    closeModals: any;
}

export const initialState: IState = {
    notifications: [],
    closeModals: false
};

export function reducer(state: IState = initialState, action: UiActions): IState {
    switch (action.type) {
        case UiActionTypes.ADD_NOTIFICATION: {
            return {
                ...state,
                notifications: [...state.notifications, action.payload]
            };
        }

        case UiActionTypes.CLOSE_MODALS: {
            return {
                ...state,
                closeModals: true
            };
        }

        default: {
            return state;
        }
    }
}

export const selectCloseModals = (state: IState) => state.closeModals;
