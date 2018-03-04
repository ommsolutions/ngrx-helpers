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

    const LoadAllSuccessAction: ISuccessAction = {
        action: "LoadAll",
        type: plantResource.getActionType("LoadAll", "success"),
        payload: undefined,
        response: plants
    };

    const LoadOneSuccessAction: ISuccessAction = {
        action: "LoadOne",
        type: plantResource.getActionType("LoadOne", "success"),
        payload: {id: 1},
        response: plants[0]
    };

    const CreateOneSuccessAction: ISuccessAction = {
        action: "CreateOne",
        type: plantResource.getActionType("CreateOne", "success"),
        payload: undefined,
        response: plants[0]
    };

    const UpdateOneSuccessAction: ISuccessAction = {
        action: "UpdateOne",
        type: plantResource.getActionType("UpdateOne", "success"),
        payload: {id: 1},
        response: plants[0]
    };

    const DeleteOneSuccessAction: ISuccessAction = {
        action: "DeleteOne",
        type: plantResource.getActionType("DeleteOne", "success"),
        payload: {id: 1},
        response: undefined
    };

    const entityAdapter = plantResource.entityAdapter;
    const initialState = entityAdapter.getInitialState();

    it("Should add all", () => {
        const state: EntityState<IPlant> = ReducerHelper.genericReducer(initialState, LoadAllSuccessAction, PlantsResource);
        expect(state.ids).toBeTruthy();
        expect(state.ids.length).toEqual(2);
        const plant = getFirstEntity(state);
        expect(plant).toBeTruthy();
        expect(plant).toEqual(plants[0]);
    });

    it("Should update one", () => {
        const state = entityAdapter.addOne(plants[0], initialState);
        expect(state.ids.length).toEqual(1);
        expect(getFirstEntity(state).city).toEqual(plants[0].city);
        const updatedCity = "New City";
        UpdateOneSuccessAction.response.city = updatedCity;
        const updatedState = ReducerHelper.genericReducer(state, UpdateOneSuccessAction, PlantsResource);
        expect(updatedState.ids.length).toEqual(1);
        expect(getFirstEntity(updatedState).city).toEqual(updatedCity);
    });

    it("Should add one", () => {
        const state = ReducerHelper.genericReducer(initialState, LoadOneSuccessAction, PlantsResource);
        expect(state.ids.length).toEqual(1);
    });

    it("Should create one", () => {
        const state = ReducerHelper.genericReducer(initialState, CreateOneSuccessAction, PlantsResource);
        expect(state.ids.length).toEqual(1);
    });

    it("Should delete one", () => {
        const state = entityAdapter.addOne(plants[0], initialState);
        expect(state.ids.length).toEqual(1);
        const updatedState = ReducerHelper.genericReducer(state, DeleteOneSuccessAction, PlantsResource);
        expect(updatedState.ids.length).toEqual(0);
    });
});

function getFirstEntity(state) {
    return state.entities[state.ids[0]];
}
