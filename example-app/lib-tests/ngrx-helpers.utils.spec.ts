import {GenericResource, resourceConfig} from "@omm/ngrx-helpers";
import {IMachine, MachinesResource} from "../app/resources/machines.resource";
import {createEntityAdapter, EntityAdapter} from "@ngrx/entity";
import {PlantsResource} from "../app/resources/plants.resource";
import {createAction, flattenActionTypeArray, isGenericActionVariant} from "../../src/utils";
import {GenericActionVariants} from "../../src/resource";

describe("Ngrx helper utils", () => {

    beforeEach(() => {
        spyOn(console, "error");
    });

    it("Should mark resource als invalid, if actionName is not defined and print error to console", () => {
        @resourceConfig({
            actionName: undefined,
            entityAdapter: undefined
        })
        class InvalidResource extends GenericResource {
        }

        expect(console.error).toHaveBeenCalled();
        expect(new InvalidResource().isValid).toBe(false);
    });

    it("Should mark resource als invalid, if entityAdapter is not defined and print error to console", () => {
        @resourceConfig({
            actionName: "InvalidResource",
            entityAdapter: undefined
        })
        class InvalidResource extends GenericResource {
        }

        expect(console.error).toHaveBeenCalled();
        expect(new InvalidResource().isValid).toBe(false);
    });

    it("Should print error to console, if resourcePath is not defined when parentResource is specified", () => {
        const machineAdapter: EntityAdapter<IMachine> = createEntityAdapter<IMachine>({
            selectId: (machine: IMachine) => machine.id,
            sortComparer: false
        });

        @resourceConfig({
            actionName: "ValidResource",
            entityAdapter: machineAdapter,
            parentResource: MachinesResource
        })
        class ValidResource extends GenericResource {
        }

        expect(console.error).toHaveBeenCalled();
        expect(new ValidResource().isValid).toBe(true);
    });

    it("Should example-app resources as valid", () => {
        expect(new PlantsResource().isValid).toBe(true);
        expect(new MachinesResource().isValid).toBe(true);
    });

    it("Should identify generic action variant", () => {
        const genericActionVariant: GenericActionVariants = {
            action: "LoadAll",
            variants: ["success"]
        };
        expect(isGenericActionVariant("LoadAll")).toBe(false);
        expect(isGenericActionVariant(genericActionVariant)).toBe(true);
    });

    it("Should flatten action type arrays", () => {
        const actionTypes = ["This", ["is", "a"], "test"];
        const flattenedArray = flattenActionTypeArray(actionTypes);
        expect(flattenedArray).toBeTruthy();
        expect(flattenedArray.length).toEqual(4);
    });

    it("Should create action", () => {
        const resourceAction = createAction(MachinesResource, "LoadAll");
        expect(resourceAction).toBeTruthy();
        expect(resourceAction.type).toBeTruthy();
        expect(resourceAction.action).toEqual("LoadAll");

        const resourceActionP = createAction(MachinesResource, "LoadAll", {id: 5});
        expect(resourceActionP).toBeTruthy();
        expect(resourceActionP.type).toBeTruthy();
        expect(resourceActionP.action).toEqual("LoadAll");
        expect(resourceActionP.payload).toBeTruthy();
        expect(resourceActionP.payload.id).toEqual(5);

        const resourceActionPO = createAction(MachinesResource, "LoadAll", {id: 5}, {parentRef: 3});
        expect(resourceActionPO).toBeTruthy();
        expect(resourceActionPO.type).toBeTruthy();
        expect(resourceActionPO.action).toEqual("LoadAll");
        expect(resourceActionPO.payload).toBeTruthy();
        expect(resourceActionPO.payload.id).toEqual(5);
        expect(resourceActionPO.options).toBeTruthy();
        expect(resourceActionPO.options.parentRef).toEqual(3);
    });
});
