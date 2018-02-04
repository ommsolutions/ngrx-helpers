import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";

import {GenericAction} from "../actions";
import {NgrxHelpersUtils} from "../utils";

@Injectable()
export class StoreHelperService {

    constructor(private store: Store<any>) {
    }

    getAll<action extends GenericAction>(actionClass: new () => action): void {
        const actionInstance = NgrxHelpersUtils.createActionInstance(actionClass, "LoadAll");
        this.store.dispatch(actionInstance);
    }

    getOne<action extends GenericAction, P>(actionClass: new() => action, payload: P): void {
        const actionInstance = NgrxHelpersUtils.createActionInstance(actionClass, "LoadOne", payload);
        this.store.dispatch(actionInstance);
    }

    updateOne<action extends GenericAction, P>(actionClass: new() => action, payload: P): void {
        const actionInstance = NgrxHelpersUtils.createActionInstance(actionClass, "UpdateOne", payload);
        this.store.dispatch(actionInstance);
    }

    deleteOne<action extends GenericAction, P>(actionClass: new() => action, payload: P): void {
        const actionInstance = NgrxHelpersUtils.createActionInstance(actionClass, "DeleteOne", payload);
        this.store.dispatch(actionInstance);
    }

    createOne<action extends GenericAction, P>(actionClass: new() => action, payload: P): void {
        const actionInstance = NgrxHelpersUtils.createActionInstance(actionClass, "CreateOne", payload);
        this.store.dispatch(actionInstance);
    }

}
