import {Actions, Effect} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import {EffectHelperService, IErrorAction, ISuccessAction} from "@omm/ngrx-helpers";
import {map} from "rxjs/operators";

import {MachinesResource} from "../resources/machines.resource";
import {AddNotification, CloseModals} from "../actions/ui.actions";


@Injectable()
export class MachinesEffects {

    /**
     * Generate the selector for a resource action to use it as ofType selector in a @Effect().
     * Below, for instance, success actions for DeleteOne, UpdateOne and CreateOne are selected.
     */
    private successNotificationSelector = this.effectHelperService.selectAction(MachinesResource, [{
        action: "DeleteOne",
        variants: ["success"]
    }, {
        action: "UpdateOne",
        variants: ["success"]
    }, {
        action: "CreateOne",
        variants: ["success"]
    }]);

    private errorNotificationSelector = this.effectHelperService.selectAction(MachinesResource, [{
        action: "DeleteOne",
        variants: ["error"]
    }, {
        action: "UpdateOne",
        variants: ["error"]
    }, {
        action: "LoadAll",
        variants: ["error"]
    }, {
        action: "LoadOne",
        variants: ["error"]
    }]);

    private closeModalSelector = this.effectHelperService.selectAction(MachinesResource, [{
        action: "CreateOne",
        variants: ["success"]
    }]);

    @Effect()
    genericMachineActions$ = this.effectHelperService.handle(this.actions$, MachinesResource);

    /**
     * We use the above defined selector to display success notifications for some actions
     * @type {Observable<AddNotification>}
     */
    @Effect()
    signalSuccess$ = this.actions$.pipe(
        this.successNotificationSelector, // This is the selector we defined earlier
        map((action: ISuccessAction) =>
            (new AddNotification({
                message: `Successfully executed: ${action.action}`,
                config: {panelClass: "snack-bar-success"}
            })))
    );

    @Effect()
    signalError$ = this.actions$.pipe(
        this.errorNotificationSelector,
        map((action: IErrorAction) =>
            (new AddNotification({
                message: `Error executing: ${action.action}`,
                config: {panelClass: "snack-bar-error"}
            })))
    );

    @Effect()
    closeModal$ = this.actions$.pipe(
        this.closeModalSelector,
        map(() => (new CloseModals()))
    );

    constructor(private actions$: Actions,
                private effectHelperService: EffectHelperService) {
    }
}
