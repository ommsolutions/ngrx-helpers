import {ActionReducerMap, createSelector, createFeatureSelector, ActionReducer, MetaReducer} from "@ngrx/store";
import {storeFreeze} from "ngrx-store-freeze";

import {environment} from "../../environments/environment";
import * as fromStudents from "./students";

export interface IState {
  students: fromStudents.IState;
}

export const reducers: ActionReducerMap<IState> = {
  students: fromStudents.reducer
};

// Log all actions
export function logger(reducer: ActionReducer<IState>): ActionReducer<IState> {
  return function (state: IState, action: any): IState {
    console.log("state", state);
    console.log("action", action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<IState>[] = !environment.production ? [logger, storeFreeze] : [];

export const getStudentState = createFeatureSelector<fromStudents.IState>("students");

export const getStudentList = createSelector(getStudentState, fromStudents.getStudentList);
