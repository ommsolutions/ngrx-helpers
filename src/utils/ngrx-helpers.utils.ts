import {Action} from "@ngrx/store";
import {GenericAction, GenericActionVariants, GenericResource, IResourceConfig} from "../resource";
import {GenericActionTypesVariants} from "../resource/generic.resource";

export const MISSING_ACTIONNAME_MSG = "The actionName of the resource is not defined. " +
    "This can lead to ambiguous action types which can break your application! " +
    "Please verify that the actionName is properly set in the resourceConfig.";

export const MISSING_ENTITYADAPTER_MSG = "EntityAdapter has to be defined, but is undefined. " +
    "Please verify that the entityAdapter is properly set in the resourceConfig.";

export const MISCONFIGURED_PARENT_RESOURCE_MSG = "ParentResource requires resourcePath to have an effect, but resourcePath is undefined." +
    "Please verify that the resourcePath is properly set in the resourceConfig.";

/**
 * Interface to reference any subtype of the GenericResource
 */
export interface IResource {
    new(...args: any[]): GenericResource;
}


export interface IPayload {
    id?: number;

    [key: string]: any;
}

/**
 * Allows further config options for effect helpers.
 */
export interface IResourceActionOptions {
    /** The resource will be queried using the id provided here
     * and the defined parent resource in the resource config. */
    parentRef?: number | string;
}

/**
 * A ResourceAction is a action derived from a resource definition, and holds additional attributes
 * such as options
 */
export class ResourceAction implements Action {
    readonly type: string;
    readonly action: GenericAction;
    readonly payload?: IPayload;
    readonly options?: IResourceActionOptions;
}

/**
 * Get an ngrx action object with the correct type and payload, based on the resource and the action.
 *
 * @return An action object, with all the required information.
 */
export function createAction<Resource extends GenericResource>(resource: new () => Resource,
                                                               action: GenericAction,
                                                               payload?: IPayload,
                                                               options?: IResourceActionOptions,
                                                               variant?: GenericActionTypesVariants): ResourceAction {

    const instance: Resource = new resource();
    const type = instance.getActionType(action, variant);
    return {type, action, payload, options};
}

/**
 * Provide the configuration for a resource
 * @param config the config to apply
 * @return The extended resource class with the configured values assigned.
 */
export function resourceConfig(config: IResourceConfig) {
    return function decorator<T extends IResource>(resourceClass: T): T {
        const isValid = validateResource(config, "error");
        return class extends resourceClass {
            // assign the config values to the resource class constructor.
            actionName = config.actionName;
            resourcePath = config.resourcePath;
            entityAdapter = config.entityAdapter;
            parentResource = config.parentResource;
            isValid = isValid;
        };
    };
}

/**
 * Validates the provided configuration. Logs warnings / errors based on logLevel for every validation error.
 * @param config The configuration to validate
 * @param logLevel The logLevel (warn or error) with which findings will be logged.
 * @return true, if it is valid, false o/w.
 */
export function validateResource(config: IResourceConfig, logLevel: "warn" | "error" = "warn") {
    const {actionName, entityAdapter, parentResource, resourcePath} = config;
    const validationErrors = [];
    // actionName exists and is at least one character long
    const isActionNameDefined = actionName != null && actionName.length > 0;
    // Entity adapter has to be defined
    const isEntityAdapterDefined = entityAdapter != null;
    // ParentReference requires resourcePath
    const isParentResourceConfiguredProperly = (parentResource != null && resourcePath != null) || parentResource == null;

    if (!isActionNameDefined) {
        validationErrors.push(MISSING_ACTIONNAME_MSG);
    }
    if (!isEntityAdapterDefined) {
        validationErrors.push(MISSING_ENTITYADAPTER_MSG);
    }
    if (!isParentResourceConfiguredProperly) {
        validationErrors.push(MISCONFIGURED_PARENT_RESOURCE_MSG);
    }
    const isValid = validationErrors.length === 0;
    if (isValid) {
        return isValid;
    } else {
        validationErrors.forEach((msg) => console[logLevel](msg));
        return false;
    }
}

/**
 * Flattens an array which contains strings and arrays of strings to an array of strings.
 * @param actionTypes The array with nested action type arrays.
 * @return An array of all action types
 */
export function flattenActionTypeArray(actionTypes: (string | string[])[]): string[] {
    return [].concat.apply([], actionTypes);
}

/**
 * Checks if the provided action is a genericActionVariants object
 * @param action The action to check
 * @return True if it is of type GenericActionVariants, false o/w.
 */
export function isGenericActionVariant(action: GenericAction | GenericActionVariants): boolean {
    return (typeof action === "object") && action.action != null;
}
