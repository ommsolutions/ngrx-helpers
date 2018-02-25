import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {MatSnackBar} from "@angular/material";
import {filter, tap} from "rxjs/operators";
import {IState, lastNotification} from "../reducers";
import {INotification} from "../reducers/ui/ui.reducer";
import {AddNotification} from "../actions/ui.actions";

@Injectable()
export class NotificationsService {

    /**
     * Selects the latest Notification from the store and opens it.
     */
    notifications$ = this.store.pipe(
        select(lastNotification),
        filter(notification => notification != null),
        tap(this.display.bind(this))
    );

    constructor(private store: Store<IState>, private snack: MatSnackBar) {
        this.notifications$.subscribe();
    }

    addNotification(config: INotification) {
        this.store.dispatch(new AddNotification(config));
    }

    private display(notification: INotification) {
        const {message, action, config} = notification;
        this.snack.open(message || "No message!", action, config);
    }
}
