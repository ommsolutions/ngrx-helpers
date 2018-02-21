import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {DispatchService} from "@omm/ngrx-helpers";
import {select, Store} from "@ngrx/store";
import {Subscription} from "rxjs/Subscription";
import {tap} from "rxjs/operators/tap";
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
    public machine: Observable<IMachine>;
    private idSubscription: Subscription;

    constructor(private dispatchService: DispatchService,
                private route: ActivatedRoute,
                private store: Store<IState>,
                public Navigator: NavigatorService) {
    }

    ngOnInit(): void {
        // decide if all machines should be loaded or just the ones for a specific plant
        this.idSubscription = this.route.params
            .pipe(
                tap(params => {
                    if (params.id) {
                        // load specific machines for one plant
                        const selector = selectMachine(params.id);
                        this.machine = this.store.pipe(select(selector));
                        this.dispatchService.dispatchComplex(MachinesResource, "LoadOne", params.id, {
                            parentRef: params.id
                        });
                    } else {
                        this.Navigator.navigateToMachines();
                    }
                })
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this.idSubscription.unsubscribe();
    }

    goBack() {
        this.Navigator.back();
    }
}
