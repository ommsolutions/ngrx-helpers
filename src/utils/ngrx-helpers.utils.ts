import {GenericAction, GenericActionTypes} from "../actions";
import {Action} from "@ngrx/store";

export class ExtendedAction<P> implements Action {
    readonly type: string;
    readonly actionType: GenericActionTypes;
    readonly payload?: P;
}

export class NgrxHelpersUtils {
    /**
     * Get an actionInstance with the correct type and payload, based on the actionclass and the actionType
     *
     * @param actionClass
     * @param actionType
     * @param payload
     * @param onlyType If true, ignores payload and just returns the type property.
     * @return Action
     */
    public static createActionInstance<action extends GenericAction, P>(actionClass: new () => action,
                                                                        actionType: GenericActionTypes,
                                                                        payload?: P,
                                                                        onlyType: boolean = false): ExtendedAction<P> {
        const instance: action = new actionClass();
        const type = instance.getActionType(actionType);

        if (onlyType || payload == null) {
            // In some cases, we just want the action with type and ignore the payload
            return {type, actionType};
        }

        return {type, actionType, payload};
    }
}
