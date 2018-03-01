import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {DispatchService} from "@omm/ngrx-helpers";
import {Subscription} from "rxjs/Subscription";
import {tap, map} from "rxjs/operators";
import {Observable} from "rxjs/Observable";

import {NavigatorService} from "../../services";
import {IState, selectMachine} from "../../reducers";
import {IMachine, MachinesResource} from "../../resources/machines.resource";

@Component({
    selector: "app-machine",
    templateUrl: "machine.component.html",
    styleUrls: ["machine.component.scss"]
})
export class MachineComponent implements OnInit, OnDestroy {
    public machine$: Observable<IMachine>;
    public machineCopy: IMachine;
    private componentSubscriptions = new Subscription();

    private loadMachine$ = this.route.params
        .pipe(tap(params => this.loadSpecificMachine(params.id)));

    constructor(private dispatchService: DispatchService,
                private route: ActivatedRoute,
                private store: Store<IState>,
                public Navigator: NavigatorService) {
    }

    ngOnInit(): void {
        this.componentSubscriptions.add(this.loadMachine$.subscribe());
    }

    loadSpecificMachine(id) {
        if (id == null) {
            // no id was found, listing all machines
            this.Navigator.navigateToMachines();
        }

        // Get the selected machine from the store and create a copy for editing
        this.machine$ = this.store.pipe(
            select(selectMachine(id)),
            map<IMachine, IMachine>(machine => this.machineCopy = {...machine})
        );
        // load the specified Machine
        this.dispatchService.dispatch(MachinesResource, "LoadOne", {id});
    }

    ngOnDestroy(): void {
        this.componentSubscriptions.unsubscribe();
    }

    save(form) {
        const result = {...this.machineCopy, ...form.value};
        this.dispatchService.dispatch(MachinesResource, "UpdateOne", result);
    }

    isValid(form) {
        return form.valid;
    }
}
