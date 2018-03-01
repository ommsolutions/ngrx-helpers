import {Component, OnDestroy, OnInit} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {MatDialog} from "@angular/material";
import {DispatchService} from "@omm/ngrx-helpers";
import {take, tap} from "rxjs/operators";

import {IState, selectAllPlants, selectPlant} from "../../reducers";
import {NavigatorService} from "../../services";
import {PlantsResource} from "../../resources/plants.resource";
import {ITableDefinition, PlantInfoComponent} from "../../component";

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
                {icon: "info_outline", fn: this.showDetails.bind(this)},
                {icon: "search", fn: this.Navigator.navigateToPlant.bind(this)}
            ]
        }]
    };

    constructor(private store: Store<IState>,
                private Navigator: NavigatorService,
                private dispatchService: DispatchService,
                private dialog: MatDialog) {
        this.plants = this.store.pipe(select(selectAllPlants));
    }

    ngOnInit(): void {
        this.dispatchService.dispatch(PlantsResource, "LoadAll");
    }

    showDetails(id: number): void {
        this.store.pipe(
            select(selectPlant(id)),
            take(1),
            tap(plant => this.dialog.open(PlantInfoComponent, {
                data: {plant}
            }))
        ).subscribe();
    }
}

