import {ActionReducerMap, createSelector, createFeatureSelector, ActionReducer, MetaReducer} from "@ngrx/store";
import {RouterReducerState} from "@ngrx/router-store/src/router_store_module";
import {storeFreeze} from "ngrx-store-freeze";

import {environment} from "../../environments/environment";
import {PlantReducer, PlantState} from "./plants";
import {MachineReducer, MachineState} from "./machines";
import {UiState, UiReducer, selectCloseModals} from "./ui";
import * as fromPlantsResource from "../resources/plants.resource";
import * as fromMachineResource from "../resources/machines.resource";
import * as fromRouter from "./router";

/**
 * Interface for the complete state composed from the all of the sub-states
 */
export interface IState {
    plants: PlantState;
    router: RouterReducerState<fromRouter.RouterStateUrl>;
    machines: MachineState;
    ui: UiState;
}

/**
 * The state of our application, composed from the reducers of each sub-state
 */
export const reducers: ActionReducerMap<IState> = {
    plants: PlantReducer,
    router: fromRouter.reducer,
    machines: MachineReducer,
    ui: UiReducer
};

// Log all actions to console. This is how we can construct metaReducers.
export function logger(reducer: ActionReducer<IState>): ActionReducer<IState> {
    return function(state: IState, action: any): IState {
        console.log("state", state);
        console.log("action", action);
        return reducer(state, action);
    };
}

/**
 * Don't apply the metaReducers in production because they are meant for development
 */
export const metaReducers: MetaReducer<IState>[] = !environment.production ? [logger, storeFreeze] : [];

// PLANT SELECTORS
export const selectPlantState = createFeatureSelector<PlantState>("plants");
export const selectAllPlants = createSelector(selectPlantState, fromPlantsResource.selectAll);
export const selectPlantEntities = createSelector(selectPlantState, fromPlantsResource.selectEntities);
export const selectPlant = (id: number) => createSelector(selectPlantEntities, entities => entities[id])
    .bind(createSelector);

// MACHINE SELECTORS
export const selectMachineState = createFeatureSelector<MachineState>("machines");
export const selectAllMachines = createSelector(selectMachineState, fromMachineResource.selectAll);
export const selectMachineEntities = createSelector(selectMachineState, fromMachineResource.selectEntities);
export const selectMachine = (id: number) => createSelector(selectMachineEntities, entities => entities[id])
        .bind(createSelector);

// UI SELECTORS
export const selectUiState = createFeatureSelector<UiState>("ui");
export const selectCloseModal = createSelector(selectUiState, selectCloseModals);
