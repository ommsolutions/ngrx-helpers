import {EntityState} from "@ngrx/entity";
import {GenericResource} from "../resource";
import {ISuccessAction} from "../effects";

export class ReducerHelper {
    public static genericReducer<I, Resource extends GenericResource>(state: EntityState<I>,
                                                                      action: ISuccessAction,
                                                                      resource: new () => Resource): EntityState<I> {
        const resourceInstance = new resource();
        const eAdapter = resourceInstance.getEntityAdapter();
        switch (action.type) {
            case resourceInstance.getActionType("LoadAll", "success"): {
                return eAdapter.addAll(action.response, state);
            }
            case resourceInstance.getActionType("LoadOne", "success"): {
                // well... https://github.com/ngrx/platform/issues/817
                const changes = {...action.response};
                delete changes.id;
                return eAdapter.upsertOne({id: action.payload.id, changes}, state);
            }
            case resourceInstance.getActionType("DeleteOne", "success"): {
                return eAdapter.removeOne(action.payload.id, state);
            }

            case resourceInstance.getActionType("UpdateOne", "success"): {
                const changes = {...action.response};
                delete changes.id;
                return eAdapter.updateOne({id: action.payload.id, changes}, state);
            }

            case resourceInstance.getActionType("CreateOne", "success"): {
                return eAdapter.addOne(action.response, state);
            }

            default: {
                return state;
            }
        }
    }
}
