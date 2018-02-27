import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material";
import {INotification} from "../reducers/ui/ui.reducer";

@Injectable()
export class NotificationsService {

    constructor(private snack: MatSnackBar) {
    }

    public display(notification: INotification) {
        const {message, action, config} = notification;
        this.snack.open(message || "No message!", action, config);
    }
}
