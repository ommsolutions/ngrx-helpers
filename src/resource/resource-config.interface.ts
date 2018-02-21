import {EntityAdapter} from "@ngrx/entity";
import {GenericResource} from "./generic.resource";

export interface IResourceConfig {
    actionName: string;
    entityAdapter: EntityAdapter<any>;
    resourcePath?: string;
    parentResource?: new () => GenericResource;
}
