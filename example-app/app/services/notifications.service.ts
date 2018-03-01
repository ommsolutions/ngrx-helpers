import {Injectable} from "@angular/core";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";
import {INotification} from "../reducers/ui/ui.reducer";

const DEFAULT_CONFIG: MatSnackBarConfig = {
    duration: 2000
};

@Injectable()
export class NotificationsService {

    constructor(private snack: MatSnackBar) {
    }

    public display(notification: INotification) {
        const {message, action, config} = notification;
        this.snack.open(message || "-", action, {...DEFAULT_CONFIG, ...config});
    }
}
