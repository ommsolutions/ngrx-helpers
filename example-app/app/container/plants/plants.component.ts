import {Component, OnInit} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {IState, selectAllPlants} from "../../reducers";
import {NavigatorService} from "../../services";
import {PlantsResource} from "../../resources/plants.resource";
import {DispatchService} from "@omm/ngrx-helpers";
import {ITableDefinition} from "../../component/table/table.component";

@Component({
    selector: "app-plants",
    templateUrl: "plants.component.html",
    styleUrls: ["plants.components.scss"]
})
export class PlantsComponent implements OnInit {
    public plants;

    public tableDefinition: ITableDefinition = {
        columns: [{
            name: "id",
            hidden: true
        }, {
            name: "city",
            hidden: false
        }, {
            name: "action",
            hidden: false,
            type: "action",
            actions: [
                {icon: "search", fn: this.Navigator.navigateToPlant.bind(this)}
            ]
        }]
    };

    constructor(private store: Store<IState>, private Navigator: NavigatorService, private dispatchService: DispatchService) {
        this.plants = this.store.pipe(select(selectAllPlants));
    }

    ngOnInit(): void {
        this.dispatchService.dispatch(PlantsResource, "LoadAll");
    }
}
