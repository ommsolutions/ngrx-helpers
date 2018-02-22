// Implementation inspired by https://github.com/ngrx/platform/blob/master/docs/router-store/api.md#custom-router-state-serializer
import {Action} from "@ngrx/store";
import {NavigationExtras} from "@angular/router";

export enum RouterActionTypes {
    GO = "[Router] Go",
    BACK = "[Router] Back"
}

export interface IRouterPayload {
    path: any[];
    query?: object;
    extras?: NavigationExtras;
}

/**
 * Navigate to a specific route defined by the payload
 */
export class Go implements Action {
    readonly type = RouterActionTypes.GO;

    constructor(public payload: IRouterPayload) {
    }
}

/**
 * Navigate to the previous route
 */
export class Back implements Action {
    readonly type = RouterActionTypes.BACK;
}
