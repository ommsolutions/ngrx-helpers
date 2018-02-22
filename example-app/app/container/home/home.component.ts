import {Component} from "@angular/core";
import {select, Store} from "@ngrx/store";

import {selectAllPlants, IState} from "../../reducers";
import {NavigatorService, NotificationsService} from "../../services";

@Component({
    selector: "app-home",
    templateUrl: "home.component.html",
    styleUrls: ["home.component.scss"]
})
export class HomeComponent {
    public plants;

    constructor(private store: Store<IState>,
                public  Navigator: NavigatorService,
                public Notifications: NotificationsService) {
        this.plants = this.store.pipe(select(selectAllPlants));
    }
}
