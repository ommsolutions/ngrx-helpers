import {ActionReducerMap, createSelector, createFeatureSelector, ActionReducer, MetaReducer} from "@ngrx/store";
import {RouterReducerState} from "@ngrx/router-store/src/router_store_module";
import {storeFreeze} from "ngrx-store-freeze";

import {environment} from "../../environments/environment";
import {PlantReducer, PlantState} from "./plants";
import {MachineReducer, MachineState} from "./machines";
import * as fromPlantsResource from "../resources/plants.resource";
import * as fromMachineResource from "../resources/machines.resource";
import * as fromRouter from "./router";

export interface IState {
    plants: PlantState;
    router: RouterReducerState<fromRouter.RouterStateUrl>;
    machines: MachineState;
}

export const reducers: ActionReducerMap<IState> = {
    plants: PlantReducer,
    router: fromRouter.reducer,
    machines: MachineReducer
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

// Plant state
export const selectPlantState = createFeatureSelector<PlantState>("plants");
export const selectAllPlants = createSelector(selectPlantState, fromPlantsResource.selectAll);

export const selectMachineState = createFeatureSelector<MachineState>("machines");
export const selectAllMachines = createSelector(selectMachineState, fromMachineResource.selectAll);
export const selectMachineEntities = createSelector(selectMachineState, fromMachineResource.selectEntities);
export const selectMachine = (id: number) => createSelector(selectMachineEntities, entities => entities[id])
    .bind(createSelector);
