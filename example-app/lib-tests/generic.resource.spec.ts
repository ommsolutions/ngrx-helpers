import {GenericResource, resourceConfig} from "@omm/ngrx-helpers";
import {MissingEntityAdapterResource, MissingNameResourceConfig, MissingResourcePathConfig, TestResource} from "./test-resources";
import "rxjs/add/observable/from";

describe("Generic Resource", () => {

    @resourceConfig(MissingNameResourceConfig)
    class InvalidResource extends GenericResource {
    }

    @resourceConfig(MissingEntityAdapterResource)
    class NoEntityAdapterResource extends GenericResource {
    }

    @resourceConfig(MissingResourcePathConfig)
    class NoResourcePathResource extends GenericResource {
    }

    @resourceConfig({
        ...MissingResourcePathConfig, resourcePath: "/valid"
    })
    class ValidResourceWithParent extends GenericResource {
    }

    beforeEach(() => {
        spyOn(console, "warn");
    });

    it("Should set isValid to false for invalid resource config", () => {
        const resource = new InvalidResource();
        expect(resource.isValid).toBe(false);
    });

    it("Should warn users of missing action name", () => {
        const resource = new InvalidResource();
        const rp = resource.getResourcePath();
        expect(rp).toBeUndefined();
        expect(console.warn).toHaveBeenCalled();
    });

    it("Should warn users of missing entityAdapter", () => {
        const resource = new NoEntityAdapterResource();
        const ea = resource.getEntityAdapter();
        expect(ea).toBeUndefined();
        expect(console.warn).toHaveBeenCalled();
    });

    it("Should warn users of missing resource path", () => {
        const resource = new NoResourcePathResource();
        const rp = resource.getResourcePath(2);
        expect(rp).toBeUndefined();
        expect(console.warn).toHaveBeenCalled();
    });

    it("Should return the resource path", () => {
        const resource = new TestResource();
        const rp = resource.getResourcePath();
        expect(rp).toEqual("/resource");
    });

    it("Should return the correct parent based resource path", () => {
        const resource = new ValidResourceWithParent();
        // get resource path of form: parent/1/child
        const rp = resource.getResourcePath(1);
        expect(rp).toBeDefined();
        expect(rp).toEqual("/resource/1/valid");
    });

    it("Should throw error, if actionType is not supported", () => {
        const resource = new TestResource();
        resource.supportedActions = ["LoadOne"];
        expect(function() {
            resource.getActionType("DeleteOne");
        }).toThrow();
    });

    it("Should return the default actionType if no variants are specified", () => {
        const resource = new TestResource();
        const actionTypes = resource.getActionTypeVariants({action: "LoadAll", variants: undefined});
        expect(actionTypes).toBeDefined();
        expect(actionTypes.length).toEqual(1);
        expect(actionTypes[0]).toEqual(resource.getActionType("LoadAll"));
        expect(actionTypes[0]).toEqual("ngrx-helpers: [TestResource] LoadAll - request");
    });

    it("Should generate all variants of the provided action type", () => {
        const resource = new TestResource();
        const actionTypes = resource.getActionTypeVariants({
            action: "LoadAll", variants: ["success", "error"]
        });
        expect(actionTypes).toBeDefined();
        expect(actionTypes.length).toEqual(2);
        expect(actionTypes[0]).toEqual("ngrx-helpers: [TestResource] LoadAll - success");
        expect(actionTypes[1]).toEqual("ngrx-helpers: [TestResource] LoadAll - error");
    });
});
