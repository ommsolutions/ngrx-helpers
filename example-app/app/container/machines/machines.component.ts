import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material";
import {select, Store} from "@ngrx/store";
import {DispatchService} from "@omm/ngrx-helpers";
import {tap} from "rxjs/operators/tap";
import {map} from "rxjs/operators/map";

import {IState, selectAllMachines, selectCloseModal} from "../../reducers";
import {AddMachineComponent, ITableDefinition} from "../../component";
import {NavigatorService} from "../../services";
import {MachinesResource} from "../../resources/machines.resource";
import {SubscriptionHandler} from "../../utils/";
import {take} from "rxjs/operators";

@Component({
    selector: "app-machines",
    templateUrl: "machines.component.html",
    styleUrls: ["machines.component.scss"]
})
export class MachinesComponent extends SubscriptionHandler implements OnInit {

    public parent: number;

    public machines$ = this.store.pipe(select(selectAllMachines));
    public loadPlant$ = this.route.paramMap.pipe(
        take(1),
        map(paramMap => paramMap.get("id")),
        tap(this.loadSpecificPlant.bind(this))
    );

    public closeModal$ = this.store.pipe(
        this.takeUntilDestroy(),
        select(selectCloseModal),
        tap(this.closeModal.bind(this))
    );

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
                {icon: "edit", fn: this.Navigator.navigateToMachine.bind(this)},
                {icon: "delete", fn: this.deleteMachine.bind(this)}
            ]
        }]
    };

    ngOnInit(): void {
        this.loadPlant$.subscribe();
        this.closeModal$.subscribe();
    }

    constructor(private route: ActivatedRoute,
                private dispatchService: DispatchService,
                private Navigator: NavigatorService,
                private store: Store<IState>,
                private dialog: MatDialog) {
        super();
    }

    loadSpecificPlant(id?: string) {
        // decide if all machines should be loaded or just the ones for a specific plant
        if (id != null) {
            this.parent = parseInt(id, 10);
            // only load with parent reference
            this.dispatchService.dispatchComplex(MachinesResource, "LoadAll", undefined, {
                parentRef: id
            });
        } else {
            this.dispatchService.dispatch(MachinesResource, "LoadAll");
        }
    }

    openAddMachineModal() {
        this.dialog.open(AddMachineComponent, {data: {parent: this.parent}});
    }

    closeModal() {
        this.dialog.closeAll();
    }

    public deleteMachine(id: number) {
        this.dispatchService.dispatch(MachinesResource, "DeleteOne", {id});
    }
}
