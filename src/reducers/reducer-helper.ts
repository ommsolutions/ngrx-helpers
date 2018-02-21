import {EntityState} from "@ngrx/entity";
import {ExtendedAction} from "../utils";
import {GenericResource} from "../resource";

export class ReducerHelper {
    public static genericReducer<I, Resource extends GenericResource>(state: EntityState<I>,
                                                                      action: ExtendedAction<any>,
                                                                      resource: new () => Resource): EntityState<I> {
        const resourceInstance = new resource();
        const eAdapter = resourceInstance.getEntityAdapter();
        switch (action.type) {
            case resourceInstance.getActionType("LoadAll", "success"): {
                return eAdapter.addAll(action.payload, state);
            }
            case resourceInstance.getActionType("LoadOne", "success"): {
                // well... https://github.com/ngrx/platform/issues/817
                const update = {...action.payload};
                delete update.id;
                return eAdapter.upsertOne({id: action.payload.id, changes: update}, state);
            }

            default: {
                return state;
            }
        }
    }
}
