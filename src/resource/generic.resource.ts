import {EntityAdapter} from "@ngrx/entity";
import {IResourceConfig} from "./resource-config.interface";

export type GenericAction = "LoadAll" | "LoadOne" | "CreateOne" | "UpdateOne" | "DeleteOne";
export type GenericActionTypesVariants = "success" | "error" | "request";

export class GenericActionVariants {
    action: GenericAction;
    variants: GenericActionTypesVariants[];
}

/**
 * Superclass which has to be extended by all action classes managed by this library.
 * Extending class must provide:
 *  - "resourceDefinition"
 *
 *  Extending class can optionally provide:
 *  - "resourcePath" -> Required when using the ngrx-rest-data.service
 *  - "supportedActionTypes" -> Adds limitation to specific action types. By default, all action types are permitted.
 *  - "payloadValidators" -> Adds validators for each action type if specified, to check payload for validity.
 */
export class GenericResource implements IResourceConfig {
    actionName: string;
    entityAdapter: EntityAdapter<any>;
    resourcePath: string;
    supportedActionTypes?: GenericAction[];
    parentResource?: new () => GenericResource;
    isValid: boolean;

    constructor() {
        if (this.isValid === false) {
            console.warn(`The resource ${this.actionName} is not valid. This might cause errors!`);
        }
    }

    public getEntityAdapter() {
        return this.entityAdapter;
    }

    /**
     * Returns the resourcePath of this resource, optionally dependent on a parent reference
     * @param parentRef the id of the parent resource which should be used.
     * @return The resourcePath according to the parentRef
     */
    public getResourcePath(parentRef?: string | number): string {
        if (parentRef != null) {
            const parentInstance = new this.parentResource();
            return `${parentInstance.getResourcePath()}/${parentRef}${this.resourcePath}`;
        } else {
            return this.resourcePath;
        }
    }

    /**
     *  Generates the action type string used by ngrx to identify actions.
     *  Actions derived from a resource will be in the following format:
     *
     *  "ngrx-helpers: [<actionName>] <action> <actionVariant>"
     *      (e.g. "ngrx-helper: [User] LoadAll - success")
     *
     *   - actionName:      Identifies the resource, which is referred by the action.
     *   - action:      Defines which action should be executed, e.g. "LoadAll" indicates, that all entities of this resource
     *                      should be requested.
     *   - actionVariant:   Used to differentiate between different states of the request, while "request" indicates the actual request,
     *                      "success" indicates a successful response and error an error response.
     *
     * @param action Specify the action part of the action type.
     * @param variant Specify the variant part of the action type.
     * @return Returns the generated action type (format: "ngrx-helper: [<actionName>] <action> - <actionVariant>")
     */
    public getActionType(action: GenericAction, variant: GenericActionTypesVariants = "request"): string {

        if (this.supportedActionTypes && this.supportedActionTypes.indexOf(action) === -1) {
            throw new Error(`The provided type is not supported by this action class, provided types are:
            ${this.supportedActionTypes.join(",")}`);
        }

        return `ngrx-helpers: [${this.actionName}] ${action} - ${variant}`;
    }

    /**
     * Convenience method to generate action types for multiple variants.
     * @return The action type for each variant specified, uses the default variant, if nothing else is specified.
     */
    public getActionTypeVariants(actionVariants: GenericActionVariants): string[] {
        const {variants, action} = actionVariants;
        const actionTypes: string[] = [];
        if (variants == null || variants.length === 0) {
            // return the default variant
            actionTypes.push(this.getActionType(action));
            return actionTypes;
        }

        for (let i = 0, l = variants.length; i < l; i++) {
            actionTypes.push(this.getActionType(action, variants[i]));
        }

        return actionTypes;
    }
}
