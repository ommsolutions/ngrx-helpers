import {Injectable} from "@angular/core";
import {Action} from "@ngrx/store";
import {ofType, Actions} from "@ngrx/effects";
import {HttpErrorResponse} from "@angular/common/http";
import {OperatorFunction} from "rxjs/interfaces";
import {catchError, map, mergeMap} from "rxjs/operators";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";

import {RestHelperService} from "../services";
import {GenericResource, GenericAction, GenericActionVariants} from "../resource";
import {flattenActionTypeArray, isGenericActionVariant, ResourceAction} from "../utils";

@Injectable()
export class EffectHelperService {

    constructor(private restHelperService: RestHelperService) {
    }

    /**
     * Adds default ngrx ofType selector for all actions (and their variants) specified.
     * @param resource The resource which should be handled, extending {GenericResource}.
     * @param actions One or more actions which should be handled. If only the action is provided, the default variant will be selected.
     * Providing the full {GenericActionVariants} specification will create actionTypes for all variants specified.
     * @return The generated ofType selector.
     */
    selectAction<Resource extends GenericResource>(resource: new () => Resource,
                                                   actions: (GenericAction | GenericActionVariants)[]): OperatorFunction<Action, Action> {
        const resourceInstance = new resource();
        const typeArray = flattenActionTypeArray(actions
            .map(action => isGenericActionVariant(action)
                ? resourceInstance.getActionTypeVariants(<GenericActionVariants>action)
                : resourceInstance.getActionType(<GenericAction>action)));
        return ofType(...typeArray);
    }

    /**
     * Executes a http request via {restHelperService} according to the specified resource.
     * @param resource The resource which is affected by the request.
     * @return An action containing the successful response of the request or an error observable containing the error which
     * occurred by executing the http request.
     */
    executeRequest<Resource extends GenericResource>(resource: new () => Resource): OperatorFunction<ResourceAction, ResourceAction> {
        return mergeMap(actionObject => {
            const resourceInstance = new resource();

            // analyse options for parentRef
            let parentRef;
            if (actionObject.options && actionObject.options.parentRef != null) {
                parentRef = actionObject.options.parentRef;
            }

            /*
             * After executing the request, we pass on action and payload, so following effects can react to the returned action
             * according to the initial action received.
             */
            return this.restHelperService.execute(
                actionObject.action,
                resourceInstance.getResourcePath(parentRef),
                actionObject.payload)
                .pipe(
                    map(response => ({
                        response,
                        action: actionObject.action,
                        payload: actionObject.payload
                    })),
                    catchError((err: HttpErrorResponse) => Observable.throw({
                        ...err,
                        action: actionObject.action,
                        payload: actionObject.payload
                    }))
                );
        });
    }


    /**
     * Creates a function which maps the {response, action, payload} to a success action for the specified resource.
     * @param resource The resource which is affected by the response
     * @return The generated map statement, mapping the input response to a success action.
     */
    handleSuccessResponse<Resource extends GenericResource>(resource: new () => Resource): OperatorFunction<any, Action> {
        return map(({response, action, payload}) => ({
            type: new resource().getActionType(action, "success"),
            payload: response,
            initialPayload: payload
        }));
    }

    /**
     * Creates a function which catches an error and maps it to an error action for the specified resource.
     * @param resource The resource which is affected by the error.
     * @return the generated catchError function which creates the error action.
     */
    handleErrorResponse<Resource extends GenericResource>(resource: new () => Resource): OperatorFunction<Action, Action> {
        return catchError((err: any) => of({
            type: new resource().getActionType(err.action, "error"),
            payload: err
        }));
    }

    /**
     * Wraps the complete process of selecting the action, executing the request and handling error and success responses.
     * Only actions will be handled which are related to the provided resource and the actions specified.
     *
     * @param source The source observable which provides the actions dispatched.
     * @param resource The resource which should be handled.
     * @param actions The actions which should be handled.
     * @return An observable emitting the success or error actions based on the request state.
     */
    handle<Resource extends GenericResource>(source: Actions,
                                             resource: new() => Resource,
                                             actions: (GenericAction | GenericActionVariants)[]): Observable<Action | ResourceAction> {
        const handlerFunctions = [
            this.selectAction(resource, actions),
            this.executeRequest(resource),
            this.handleSuccessResponse(resource),
            this.handleErrorResponse(resource)
        ];
        return source.pipe(...handlerFunctions);
    }
}
