import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {OperatorFunction} from "rxjs/interfaces";
import {Action} from "@ngrx/store";
import {ofType} from "@ngrx/effects";
import {catchError, map, mergeMap} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {pipe} from "rxjs/RX";
import {Observable} from "rxjs/Observable";

import {RestHelperService} from "../services";
import {GenericResource, GenericAction} from "../resource";
import {ExtendedAction} from "../utils";
import "rxjs/add/observable/throw";

@Injectable()
export class EffectHelperService {

    constructor(private restHelperService: RestHelperService) {
    }

    /**
     * Adds default ngrx ofType selector for all actions.
     * @param actionClass The ActionClass which should be handled (extending GenericResource).
     * @param action One or more action which should be handled.
     * @return The generated ofType selector.
     */
    selectAction<Resource extends GenericResource>(actionClass: new () => Resource,
                                                   action: GenericAction | GenericAction[]): OperatorFunction<Action, Action> {
        action = [].concat(action);
        const actionInstance = new actionClass();
        const typeArray = action.map((actionType: GenericAction) => actionInstance.getActionType(actionType));
        return ofType(...typeArray);
    }

    executeRequest<action extends GenericResource, R>
    (actionClass: new () => action): OperatorFunction<ExtendedAction<R>, ({ response: R, actionType: string })> {
        return mergeMap((actionObject: ExtendedAction<any>) => {
            const actionInstance = new actionClass();

            // analyse options for parentRef
            let parentRef;
            if (actionObject.options && actionObject.options.parentRef != null) {
                parentRef = actionObject.options.parentRef;
            }

            return this.restHelperService.loadAll<R>(actionInstance.getResourcePath(parentRef))
                .pipe(
                    map((response: R) => ({response, action: actionObject.action})),
                    catchError((err: HttpErrorResponse) => Observable.throw({...err, action: actionObject.action})));
        });
    }


    /**
     * Creates the success action for the specified actionClass and actionType.
     * @param actionClass The action class which specifies the base action type.
     * @return The generated map statement, mapping the input response to a success action.
     */
    handleSuccessResponse<Resource extends GenericResource>(actionClass: new () => Resource): OperatorFunction<any, Action> {
        return map(({response, action}) => ({
            type: new actionClass().getActionType(action, "success"),
            payload: response
        }));
    }

    /**
     * Creates the error action for the specified actionClass and actionType.
     * @param actionClass The action class which specifies the base action type.
     * @return res
     */
    handleErrorResponse<Resource extends GenericResource>(actionClass: new () => Resource): OperatorFunction<Action, Action> {
        return catchError((err: any) => of({
            type: new actionClass().getActionType(err.action, "error"),
            payload: err
        }));
    }

    /**
     *
     * skipErrorHandling: boolean = false,
     * skipSuccessHandling: boolean = false,
     * skipExecuteRequest: boolean = false

     * @param actionClass
     * @param action
     * @return
     */
    handle<Resource extends GenericResource>(actionClass: { new(): Resource },
                                             action: GenericAction | GenericAction[]): OperatorFunction<Action, Action> {
        return pipe(
            this.selectAction(actionClass, action),
            this.executeRequest(actionClass),
            this.handleSuccessResponse(actionClass),
            this.handleErrorResponse(actionClass)
        );
    }
}
