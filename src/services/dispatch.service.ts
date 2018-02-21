import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";

import {GenericResource, GenericAction} from "../resource";
import {createAction, IExtendedActionOptions} from "../utils";

@Injectable()
export class DispatchService {

    constructor(private store: Store<any>) {
    }

    dispatch<action extends GenericResource, P>(actionClass: new () => action,
                                                actionType: GenericAction,
                                                payload?: P): void {
        const actionInstance = createAction(actionClass, actionType, payload);
        this.store.dispatch(actionInstance);
    }

    dispatchComplex<action extends GenericResource, P>(actionClass: new () => action,
                                                       actionType: GenericAction,
                                                       payload?: P,
                                                       options?: IExtendedActionOptions): void {
        const actionInstance = createAction(actionClass, actionType, payload, options);
        this.store.dispatch(actionInstance);
    }
}
