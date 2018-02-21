import {EntityState} from "@ngrx/entity";
import {ExtendedAction} from "../utils";
import {GenericResource} from "../resource";

export class ReducerHelper {
    public static genericReducer<I, action extends GenericResource>(state: EntityState<I>,
                                                                    action: ExtendedAction<any>,
                                                                    actionClass: new () => action): EntityState<I> {
        const actionInstance = new actionClass();
        const eAdapter = actionInstance.getEntityAdapter();
        switch (action.type) {
            case actionInstance.getActionType("LoadAll", "success"): {
                return eAdapter.addMany(action.payload, state);
            }
            default: {
                return state;
            }
        }
    }
}
