import {createEntityAdapter, EntityAdapter} from "@ngrx/entity";
import {GenericResource, resourceConfig} from "@omm/ngrx-helpers";

export const MissingNameResourceConfig = {
    actionName: undefined,
    entityAdapter: undefined
};

export const MissingEntityAdapterResource = {
    actionName: "TestResource",
    entityAdapter: undefined
};

export interface ITestResource {
    id: number;
    name: string;
    value: number;
}

export const selectId = (test: ITestResource) => test.id;

const testAdapter: EntityAdapter<ITestResource> = createEntityAdapter<ITestResource>({
    selectId,
    sortComparer: false
});

export const ValidResourceConfig = {
    actionName: "TestResource",
    entityAdapter: testAdapter,
    resourcePath: "/resource"
};

@resourceConfig(ValidResourceConfig)
export class TestResource extends GenericResource {
}

export const MissingResourcePathConfig = {
    actionName: "ValidResource",
    entityAdapter: testAdapter,
    parentResource: TestResource
};


