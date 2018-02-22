import {Actions, Effect} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import {EffectHelperService, ResourceAction} from "@omm/ngrx-helpers";
import {map} from "rxjs/operators";

import {MachinesResource} from "../resources/machines.resource";
import {AddNotification} from "../actions/ui.actions";


@Injectable()
export class MachinesEffects {

    /**
     * Generate the selector for a resource action to use it as ofType selector when attaching further effects to.
     * In this example we want to let the delete action alongside the load action be handled by the {effectHelperService}
     * but in addition display a notification.
     */
    private deleteOneSelector = this.effectHelperService.selectAction(MachinesResource, [{
        action: "DeleteOne",
        variants: ["success"]
    }]);

    @Effect()
    genericMachineActions$ = this.effectHelperService.handle(
        this.actions$,
        MachinesResource,
        ["LoadAll", "LoadOne", "DeleteOne"]
    );

    @Effect()
    signalNotification$ = this.actions$.pipe(
        this.deleteOneSelector, // This is the selector we defined earlier
        map((action: ResourceAction) =>
            (new AddNotification({message: `Deleted machine with id: ${action.initialPayload}`})))
    );

    constructor(private actions$: Actions,
                private effectHelperService: EffectHelperService) {
    }
}
