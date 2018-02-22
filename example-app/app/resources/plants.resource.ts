import {GenericResource, resourceConfig} from "@omm/ngrx-helpers";
import {createEntityAdapter, EntityAdapter} from "@ngrx/entity";

export interface IPlant {
    id: number;
    city: string;
    zipCode: string;
    street: string;
    country: string;
    description: string;
}

export const plantAdapter: EntityAdapter<IPlant> = createEntityAdapter<IPlant>({
    selectId: (plant: IPlant) => plant.id,
    sortComparer: false
});

export const {selectAll} = plantAdapter.getSelectors();

@resourceConfig({
    actionName: "Plants",
    entityAdapter: plantAdapter,
    resourcePath: "/plants"
})
export class PlantsResource extends GenericResource {
}
