// See here for implementation: https://github.com/ngrx/platform/blob/master/docs/router-store/api.md#custom-router-state-serializer
import {Action} from "@ngrx/store";
import {NavigationExtras} from "@angular/router";

export const GO = "[Router] Go";
export const BACK = "[Router] Back";

/**
 * Navigate to a specific route
 */
export class Go implements Action {
    readonly type = GO;

    constructor(public payload: {
        path: any[];
        query?: object;
        extras?: NavigationExtras;
    }) {
    }
}

/**
 * Navigate to the previous route
 */
export class Back implements Action {
    readonly type = BACK;
}
