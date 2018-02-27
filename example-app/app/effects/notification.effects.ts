import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {filter, tap} from "rxjs/operators";

import {NotificationsService} from "../services";
import {UiActionTypes} from "../actions/ui.actions";

@Injectable()
export class NotificationEffects {

    /**
     * Selects the latest Notification from the store and opens it.
     */
    @Effect({dispatch: false})
    notifications$ = this.actions$.pipe(
        ofType(UiActionTypes.ADD_NOTIFICATION),
        filter((action: any) => action.payload != null),
        tap((action: any) => this.Notification.display(action.payload))
    );

    constructor(private actions$: Actions,
                private Notification: NotificationsService) {
    }
}
