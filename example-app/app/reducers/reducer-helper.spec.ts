/**
 * Static test for the library test code
 */
import {ISuccessAction, ReducerHelper} from "@omm/ngrx-helpers";
import {IPlant, PlantsResource} from "../resources/plants.resource";
import {EntityState} from "@ngrx/entity";

describe("reducer-helper", () => {
    const plantResource: PlantsResource = new PlantsResource();
    const plants: IPlant[] = [{
        "id": 1,
        "city": "Devonstad",
        "zipCode": "78179",
        "street": "Audie Glens",
        "country": "Lesotho",
        "description": "provident fugiat voluptas"
    }, {
        "id": 2,
        "city": "North Jadaton",
        "zipCode": "13812-8612",
        "street": "Idell Passage",
        "country": "Saint Pierre and Miquelon",
        "description": "est dignissimos et"
    }];

    it("Should add all", () => {
        const LoadAllSuccessAction: ISuccessAction = {
            action: "LoadAll",
            type: plantResource.getActionType("LoadAll", "success"),
            payload: undefined,
            response: plants
        };
        const state: EntityState<IPlant> = ReducerHelper.genericReducer(plantResource.entityAdapter.getInitialState(),
            LoadAllSuccessAction,
            PlantsResource);
        expect(state.ids).toBeTruthy();
        expect(state.ids.length).toEqual(2);

        const plant = state.entities[state.ids[0]];
        expect(plant).toBeTruthy();
        expect(plant).toEqual(plants[0]);
    });
});
