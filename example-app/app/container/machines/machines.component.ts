import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {DispatchService} from "@omm/ngrx-helpers";
import {Subscription} from "rxjs/Subscription";
import {tap} from "rxjs/operators/tap";

import {IState, selectAllMachines} from "../../reducers";
import {MachinesResource} from "../../resources/machines.resource";
import {ITableDefinition} from "../../component/table/table.component";
import {NavigatorService} from "../../services";

@Component({
    selector: "app-machines",
    templateUrl: "machines.component.html",
    styleUrls: ["machines.component.scss"]
})
export class MachinesComponent implements OnInit, OnDestroy {

    private idSubscription: Subscription;
    public machines;
    public tableDefinition: ITableDefinition = {
        columns: [{
            name: "id",
            hidden: false
        }, {
            name: "price",
            hidden: false
        }, {
            name: "lastFailure",
            hidden: false
        }, {
            name: "ip",
            hidden: false
        }, {
            name: "mac",
            hidden: false
        }, {
            name: "plantId",
            hidden: false
        }, {
            name: "action",
            hidden: false,
            type: "action",
            actions: [
                {icon: "search", fn: this.Navigator.navigateToMachine.bind(this)},
                {icon: "delete", fn: (id) => console.log("Deleting", id)}
            ]
        }]
    };

    ngOnInit(): void {
        // decide if all machines should be loaded or just the ones for a specific plant
        this.idSubscription = this.route.params
            .pipe(
                tap(params => {
                    if (params.id) {
                        // load specific machines for one plant
                        this.machines = this.store.pipe(select(selectAllMachines));
                        this.dispatchService.dispatchComplex(MachinesResource, "LoadAll", undefined, {
                            parentRef: params.id
                        });
                    } else {
                        // load all machines
                        this.machines = this.store.pipe(select(selectAllMachines));
                        this.dispatchService.dispatch(MachinesResource, "LoadAll");
                    }
                })
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this.idSubscription.unsubscribe();
    }

    constructor(private route: ActivatedRoute,
                private dispatchService: DispatchService,
                private Navigator: NavigatorService,
                private store: Store<IState>) {
    }
}
