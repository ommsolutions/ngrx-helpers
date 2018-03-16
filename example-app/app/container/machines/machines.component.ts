import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material";
import {select, Store} from "@ngrx/store";
import {DispatchService} from "@omm/ngrx-helpers";
import {Subscription} from "rxjs/Subscription";
import {tap} from "rxjs/operators/tap";

import {IState, selectAllMachines, selectCloseModal} from "../../reducers";
import {AddMachineComponent, ITableDefinition} from "../../component";
import {NavigatorService} from "../../services";
import {MachinesResource} from "../../resources/machines.resource";

@Component({
    selector: "app-machines",
    templateUrl: "machines.component.html",
    styleUrls: ["machines.component.scss"]
})
export class MachinesComponent implements OnInit, OnDestroy {

    private componentSubscriptions = new Subscription();
    public machines$ = this.store.pipe(select(selectAllMachines));
    public parent;

    private closeModal$ = this.store.pipe(
        select(selectCloseModal),
        tap(() => this.closeModal()));

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
        this.componentSubscriptions.add(this.closeModal$.subscribe());
        this.route.params.pipe(tap(params => this.loadSpecificPlant(params.id))).subscribe();
    }

    ngOnDestroy(): void {
        this.componentSubscriptions.unsubscribe();
    }

    constructor(private route: ActivatedRoute,
                private dispatchService: DispatchService,
                private Navigator: NavigatorService,
                private store: Store<IState>,
                private dialog: MatDialog) {
    }

    loadSpecificPlant(id?: number) {
        // decide if all machines should be loaded or just the ones for a specific plant
        if (id != null) {
            this.parent = id;
            // only load with parent reference
            this.dispatchService.dispatchComplex(MachinesResource, "LoadAll", undefined, {
                parentRef: id
            });
        } else {
            this.dispatchService.dispatch(MachinesResource, "LoadAll");
        }
        this.componentSubscriptions.add(this.machines$.subscribe());
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
