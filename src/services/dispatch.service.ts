import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";

import {GenericAction, GenericActionTypes} from "../actions";
import {NgrxHelpersUtils} from "../utils";

export interface IDispatchOptions {
    parent: {
        resource: new () => GenericAction;
        id: number
    };
}

@Injectable()
export class DispatchService {

    constructor(private store: Store<any>) {
    }

    dispatch<action extends GenericAction, P>(actionClass: new () => action,
                                              actionType: GenericActionTypes,
                                              payload?: P): void {
        const actionInstance = NgrxHelpersUtils.createActionInstance(actionClass, actionType, payload);
        this.store.dispatch(actionInstance);
    }


    /**
     * TODO: this dispatch should be able to make request to concated resource paths
     * However, this is currently not considered in the architecture of the module ...
     */
    dispatchComplex<action extends GenericAction, P>(actionClass: new () => action,
                                                     actionType: GenericActionTypes,
                                                     payload?: P,
                                                     options?: IDispatchOptions): void {
        const actionInstance = NgrxHelpersUtils.createActionInstance(actionClass, actionType, payload);
        console.log("options", options);
        this.store.dispatch(actionInstance);
    }
}
