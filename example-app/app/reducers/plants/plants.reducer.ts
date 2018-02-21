import {ExtendedAction, ReducerHelper} from "@omm/ngrx-helpers";
import {EntityState} from "@ngrx/entity";

import {IPlant, plantAdapter, PlantsResource} from "../../resources/plants.resource";


export interface IState extends EntityState<IPlant> {
}

export const initialState: EntityState<IPlant> = plantAdapter.getInitialState();

export function reducer(state: EntityState<IPlant> = initialState, action: ExtendedAction<any>): IState {
    return ReducerHelper.genericReducer<IPlant, PlantsResource>(state, action, PlantsResource);
}


