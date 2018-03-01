import {EntityState} from "@ngrx/entity";
import {ReducerHelper, ISuccessAction} from "@omm/ngrx-helpers";

import {IMachine, machineAdapter, MachinesResource} from "../../resources/machines.resource";

export interface IState extends EntityState<IMachine> {
}

export const initialState: EntityState<IMachine> = machineAdapter.getInitialState();

export function reducer(state: EntityState<IMachine> = initialState, action: ISuccessAction): IState {
    return ReducerHelper.genericReducer<IMachine, MachinesResource>(state, action, MachinesResource);
}


