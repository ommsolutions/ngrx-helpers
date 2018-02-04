import {ExtendedAction} from "../utils";
import {GenericAction} from "../actions";

export class ReducerHelper {
    public static genericReducer<S, action extends GenericAction>(state: S,
                                                                  action: ExtendedAction<any>,
                                                                  actionClass: new () => action): S {

        const actionInstance = new actionClass();
        switch (action.type) {
            case actionInstance.getActionType("LoadAll", "success"):
                return {
                    ...<any>state,
                    studentList: [].concat((<any>action).payload)
                };
            case actionInstance.getActionType("LoadOne", "success"):
                return state;
        }
        return state;
    }
}
