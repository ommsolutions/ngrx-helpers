import {ActionReducerMap, createSelector, createFeatureSelector, ActionReducer, MetaReducer} from "@ngrx/store";
import {RouterReducerState} from "@ngrx/router-store/src/router_store_module";
import {storeFreeze} from "ngrx-store-freeze";

import {environment} from "../../environments/environment";
import * as fromStudents from "./students";
import * as fromRouter from "./router";

export interface IState {
    students: fromStudents.IState;
    router: RouterReducerState<fromRouter.RouterStateUrl>;
}

export const reducers: ActionReducerMap<IState> = {
    students: fromStudents.reducer,
    router: fromRouter.reducer
};

// Log all actions
export function logger(reducer: ActionReducer<IState>): ActionReducer<IState> {
    return function (state: IState, action: any): IState {
        console.log("state", state);
        console.log("action", action);
        return reducer(state, action);
    };
}

/**
 * Apply logging and store freeze only during development
 */
export const metaReducers: MetaReducer<IState>[] = !environment.production ? [logger, storeFreeze] : [];

export const getStudentState = createFeatureSelector<fromStudents.IState>("students");

export const getStudentList = createSelector(getStudentState, fromStudents.getStudentList);
