import {Action} from "@ngrx/store";
import {GenericResource, GenericAction, IResourceConfig} from "../resource";

/**
 * Interface to reference any subtype of the GenericResource
 */
export interface IResource {
    new(...args: any[]): GenericResource;
}

/**
 * Allows further config options for effect helpers.
 */
export interface IExtendedActionOptions {
    /** The resource will be queried using the id provided here
     * and the defined parent resource in the resource config. */
    parentRef?: number | string;
}

export class ExtendedAction<P> implements Action {
    readonly type: string;
    readonly action: GenericAction;
    readonly payload?: P;
    readonly options?: IExtendedActionOptions;
}

/**
 * Get an ngrx action object with the correct type and payload, based on the resource and the action.
 *
 * @param resource
 * @param action
 * @param payload
 * @param options
 * @return A action object, with all the required information.
 */
export function createAction<Resource extends GenericResource, PayloadType>(resource: new () => Resource,
                                                                            action: GenericAction,
                                                                            payload?: PayloadType,
                                                                            options?: IExtendedActionOptions): ExtendedAction<PayloadType> {
    const instance: Resource = new resource();
    const type = instance.getActionType(action);
    return {type, action, payload, options};
}

/**
 * Provide the configuration for a resource
 * @param config the config to apply
 * @return The extended resource class with the configured values assigned.
 */
export function resourceConfig(config: IResourceConfig) {
    return function decorator<T extends IResource>(resourceClass: T): T {
        const isValid = validateResource(config);
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
 * Validates the provided configuration.
 * @return true, if it is valid, false o/w.
 */
function validateResource(config: IResourceConfig) {
    const {actionName, entityAdapter, parentResource, resourcePath} = config;
    // actionName exists and is at least one character long
    const isActionNameDefined = actionName != null && actionName.length > 0;
    // Entity adapter has to be defined
    const isEntityAdapterDefined = entityAdapter != null;
    // ParentReference requires resourcePath

    if (!isActionNameDefined) {
        console.error("ActionName has to be defined, but is undefined.");
    }
    if (!isEntityAdapterDefined) {
        console.error("EntityAdapter has to be defined, but is undefined.");
    }
    if (parentResource != null && resourcePath == null) {
        console.error("ParentResource requires resourcePath to have an effect.");
    }

    const isValid = isActionNameDefined && isEntityAdapterDefined;
    if (!isValid) {
        console.error(`Resource: "${actionName}" could not be created. all related actions will probably fail`);
    }
    return isValid;
}
