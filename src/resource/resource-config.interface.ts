import {EntityAdapter} from "@ngrx/entity";
import {GenericResource} from "@omm/ngrx-helpers";

export interface IResourceConfig {
    actionName: string;
    entityAdapter: EntityAdapter<any>;
    resourcePath?: string;
    parentResource?: new () => GenericResource;
}
