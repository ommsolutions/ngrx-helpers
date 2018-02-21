import {GenericResource, resourceConfig} from "@omm/ngrx-helpers";
import {createEntityAdapter, EntityAdapter} from "@ngrx/entity";
import {PlantsResource} from "./plants.resource";

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

@resourceConfig({
    actionName: "Machines",
    entityAdapter: machineAdapter,
    resourcePath: "/machines",
    parentResource: PlantsResource
})
export class MachinesResource extends GenericResource {
}



