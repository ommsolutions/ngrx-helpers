import {Injectable} from "@angular/core";
import {OperatorFunction} from "rxjs/interfaces";
import {Action} from "@ngrx/store";
import {ofType} from "@ngrx/effects";
import {catchError, map, mergeMap} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {pipe} from "rxjs/RX";
import {Observable} from "rxjs/Observable";

import {RestHelperService} from "../services";
import {GenericAction, GenericActionTypes} from "../actions";
import {ExtendedAction} from "../utils";
import "rxjs/add/observable/throw";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class EffectHelperService {

    constructor(private restHelperService: RestHelperService) {
    }

    /**
     * Adds default ngrx ofType selector for all action types provided.
     * @param {{new(): action}} actionClass The ActionClass which should be handled (extending GenericAction).
     * @param {GenericActionTypes | GenericActionTypes[]} actionTypes One or more action types which should be handled.
     * @return {OperatorFunction<Action, Action>} The generated ofType selector.
     */
    selectAction<action extends GenericAction>(actionClass: new () => action,
                                               actionTypes: GenericActionTypes | GenericActionTypes[]): OperatorFunction<Action, Action> {
        actionTypes = [].concat(actionTypes);
        const actionInstance = new actionClass();
        const typeArray = actionTypes.map((actionType: GenericActionTypes) => actionInstance.getActionType(actionType));
        return ofType(...typeArray);
    }

    executeRequest<action extends GenericAction, R>
    (actionClass: new () => action): OperatorFunction<ExtendedAction<R>, ({ response: R, actionType: string })> {
        return mergeMap((actionObject: ExtendedAction<any>) => {
            const actionInstance = new actionClass();
            // we need to forward the actionType to later operators, so the response can be handled properly.
            return this.restHelperService.loadAll<R>(actionInstance.resourcePath)
                .pipe(
                    map((response: R) => ({response, actionType: actionObject.actionType})),
                    catchError((err: HttpErrorResponse) => Observable.throw({...err, actionType: actionObject.actionType})));
        });
    }


    /**
     * Creates the success action for the specified actionClass and actionType.
     * @param {{new(): action}} actionClass The action class which specifies the base action type.
     * @return {OperatorFunction<any, Action>} The generated map statement, mapping the input response to a success action.
     */
    handleSuccessResponse<action extends GenericAction>(actionClass: new () => action): OperatorFunction<any, Action> {
        return map(({response, actionType}) => ({
            type: new actionClass().getActionType(actionType, "success"),
            payload: response
        }));
    }

    /**
     * Creates the error action for the specified actionClass and actionType.
     * @param {{new(): action}} actionClass The action class which specifies the base action type.
     * @return {OperatorFunction<Action, Action>}
     */
    handleErrorResponse<action extends GenericAction>(actionClass: new () => action): OperatorFunction<Action, Action> {
        return catchError((err: any) => of({
            type: new actionClass().getActionType(err.actionType, "error"),
            payload: err
        }));
    }

    /**
     *
     * skipErrorHandling: boolean = false,
     * skipSuccessHandling: boolean = false,
     * skipExecuteRequest: boolean = false

     * @param {{new(): action}} actionClass
     * @param {GenericActionTypes} actionType
     * @return {OperatorFunction<Action, Action>}
     */
    handle<action extends GenericAction>(actionClass: new () => action,
                                         actionType: GenericActionTypes): OperatorFunction<Action, Action> {
        return pipe(
            this.selectAction(actionClass, actionType),
            this.executeRequest(actionClass),
            this.handleSuccessResponse(actionClass),
            this.handleErrorResponse(actionClass)
        );
    }
}
