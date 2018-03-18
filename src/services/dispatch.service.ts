import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";

import {GenericAction, GenericActionTypesVariants, GenericResource} from "../resource";
import {createAction, IPayload, IResourceActionOptions} from "../utils";

@Injectable()
export class DispatchService {

    constructor(private store: Store<any>) {
    }

    dispatch<resource extends GenericResource>(resource: new () => resource,
                                               action: GenericAction,
                                               payload?: IPayload,
                                               variant?: GenericActionTypesVariants): void {
        const actionInstance = createAction(resource, action, payload, undefined, variant);
        this.store.dispatch(actionInstance);
    }

    dispatchComplex<resource extends GenericResource, P>(resource: new () => resource,
                                                         action: GenericAction,
                                                         payload?: IPayload,
                                                         options?: IResourceActionOptions): void {
        const actionInstance = createAction(resource, action, payload, options);
        this.store.dispatch(actionInstance);
    }
}
