import {ExtendedAction, ReducerHelper} from "@omm/ngrx-helpers";
import {EntityState} from "@ngrx/entity";

import {IMachine, machineAdapter, MachinesResource} from "../../resources/machines.resource";

export interface IState extends EntityState<IMachine> {
}

export const initialState: EntityState<IMachine> = machineAdapter.getInitialState();

export function reducer(state: EntityState<IMachine> = initialState, action: ExtendedAction<any>): IState {
    return ReducerHelper.genericReducer<IMachine, MachinesResource>(state, action, MachinesResource);
}


