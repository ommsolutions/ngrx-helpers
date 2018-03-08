import {GenericResource, resourceConfig} from "@omm/ngrx-helpers";
import {MachinesResource} from "../app/resources/machines.resource";
import {PlantsResource} from "../app/resources/plants.resource";
import {createAction, flattenActionTypeArray, isGenericActionVariant} from "../../src/utils";
import {GenericActionVariants} from "../../src/resource";
import {MissingEntityAdapterResource, MissingNameResourceConfig, MissingResourcePathConfig, TestResource} from "./test-resources";

describe("Ngrx helper utils", () => {

    beforeEach(() => {
        spyOn(console, "error");
    });

    it("Should mark resource als invalid, if actionName is not defined and print error to console", () => {

        @resourceConfig(MissingNameResourceConfig)
        class InvalidResource extends GenericResource {
        }

        expect(console.error).toHaveBeenCalled();
        expect(new InvalidResource().isValid).toBe(false);
    });

    it("Should mark resource als invalid, if entityAdapter is not defined and print error to console", () => {
        @resourceConfig(MissingEntityAdapterResource)
        class InvalidResource extends GenericResource {
        }

        expect(console.error).toHaveBeenCalled();
        expect(new InvalidResource().isValid).toBe(false);
    });

    it("Should print error to console, if resourcePath is not defined when parentResource is specified", () => {
        @resourceConfig(MissingResourcePathConfig)
        class ValidResource extends GenericResource {
        }

        expect(console.error).toHaveBeenCalled();
        expect(new ValidResource().isValid).toBe(true);
    });

    it("Should mark example-app resources as valid", () => {
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
        const resourceAction = createAction(TestResource, "LoadAll");
        expect(resourceAction).toBeTruthy();
        expect(resourceAction.type).toBeTruthy();
        expect(resourceAction.action).toEqual("LoadAll");

        const resourceActionP = createAction(TestResource, "LoadAll", {id: 5});
        expect(resourceActionP).toBeTruthy();
        expect(resourceActionP.type).toBeTruthy();
        expect(resourceActionP.action).toEqual("LoadAll");
        expect(resourceActionP.payload).toBeTruthy();
        expect(resourceActionP.payload.id).toEqual(5);

        const resourceActionPO = createAction(TestResource, "LoadAll", {id: 5}, {parentRef: 3});
        expect(resourceActionPO).toBeTruthy();
        expect(resourceActionPO.type).toBeTruthy();
        expect(resourceActionPO.action).toEqual("LoadAll");
        expect(resourceActionPO.payload).toBeTruthy();
        expect(resourceActionPO.payload.id).toEqual(5);
        expect(resourceActionPO.options).toBeTruthy();
        expect(resourceActionPO.options.parentRef).toEqual(3);
    });
});
