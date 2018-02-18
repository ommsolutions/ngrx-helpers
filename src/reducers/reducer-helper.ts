import {ExtendedAction} from "../utils";
import {GenericAction} from "../actions";
import {EntityState} from "@ngrx/entity";

export class ReducerHelper {
    public static genericReducer<I, action extends GenericAction>(state: EntityState<I>,
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
