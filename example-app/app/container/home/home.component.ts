import {Component} from "@angular/core";
import {select, Store} from "@ngrx/store";

import {selectAllPlants, IState} from "../../reducers";
import {NavigatorService} from "../../services";
import {AddNotification} from "../../actions/ui.actions";

@Component({
    selector: "app-home",
    templateUrl: "home.component.html",
    styleUrls: ["home.component.scss"]
})
export class HomeComponent {
    public plants;

    constructor(private store: Store<IState>,
                public navigatorService: NavigatorService) {
        this.plants = this.store.pipe(select(selectAllPlants));
    }

    testNotificationService() {
        this.store.dispatch(new AddNotification({message: "Hello there ;-)"}));
    }
}
