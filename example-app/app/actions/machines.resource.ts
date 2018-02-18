import {GenericAction, resourceDefinition} from "@omm/ngrx-helpers";
import {createEntityAdapter, EntityAdapter} from "@ngrx/entity";

export interface IMachine {
    id: number;
    price: string;
    lastFailure: string;
    ip: string;
    mac: string;
    plantId: number;
}

export const machineAdapter: EntityAdapter<IMachine> = createEntityAdapter<IMachine>({
    selectId: (machine: IMachine) => machine.id,
    sortComparer: false
});

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal
} = machineAdapter.getSelectors();

@resourceDefinition("Machines", machineAdapter, "/machines")
export class MachinesResource extends GenericAction {
}



