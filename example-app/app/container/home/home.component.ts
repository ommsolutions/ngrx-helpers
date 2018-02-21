import {Component} from "@angular/core";
import {select, Store} from "@ngrx/store";

import {selectAllPlants, IState} from "../../reducers";
import {NavigatorService} from "../../services";

@Component({
    selector: "app-home",
    templateUrl: "home.component.html",
    styleUrls: ["home.component.scss"]
})
export class HomeComponent {
    public plants;

    constructor(private store: Store<IState>, private Navigator: NavigatorService) {
        this.plants = this.store.pipe(select(selectAllPlants));
    }

    goToPlants() {
        this.Navigator.navigateToPlants();
    }
}
