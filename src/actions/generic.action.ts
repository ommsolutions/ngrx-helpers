export type GenericActionTypes = "LoadAll" | "LoadOne" | "CreateOne" | "UpdateOne" | "DeleteOne";
export type GenericActionTypesVariants = "success" | "error" | "default";

// export type IValidatorFunction = <P>(payload: P) => boolean;

const DEFAULT_SUPPORTED_ACTION_TYPES: GenericActionTypes[] = ["LoadAll", "LoadOne", "CreateOne", "UpdateOne", "DeleteOne"];

/**
 * Superclass which has to be extended by all action classes managed by this library.
 * Extending class must provide:
 *  - "actionName"
 *
 *  Extending class can optionally provide:
 *  - "resourcePath" -> Required when using the ngrx-rest-data.service
 *  - "supportedActionTypes" -> Adds limitation to specific action types. By default, all action types are permitted.
 *  - "payloadValidators" -> Adds validators for each action type if specified, to check payload for validity.
 */
export abstract class GenericAction {
    abstract actionName: string;
    resourcePath: string;
    supportedActionTypes: GenericActionTypes[] = DEFAULT_SUPPORTED_ACTION_TYPES;
    // payloadValidators: Map<GenericActionTypes, IValidatorFunction> = new Map()
    //     .set("LoadOne", (payload) => payload.id != null);

    private get loadAllType(): string {
        return `[${this.actionName}] Load all`;
    }

    private get loadOneType(): string {
        return `${this.actionName}] Load one`;
    }

    private get createOneType(): string {
        return `${this.actionName}] Create one`;
    }

    private get updateOneType(): string {
        return `${this.actionName}] Update one`;
    }

    private get deleteOneType(): string {
        return `${this.actionName}] Delete one`;
    }

    public getActionType(type: GenericActionTypes, variant: GenericActionTypesVariants = "default"): string {

        /**
         * Check integrity of action class.
         *  - actionName must be provided
         *  - type must not be null
         *  - if a supportedActionTypes array is provided, it has to contain the provided type
         */
        if (!this.actionName) {
            throw new Error(`Please add the attribte 'actionName' to your custom action before using it`);
        }

        if (!type) {
            console.error(`There was no action type specified for ${this.actionName}`);
            // throw new Error(`Please provide a valid type to this function`);
        }

        if (this.supportedActionTypes && this.supportedActionTypes.indexOf(type) === -1) {
            throw new Error(`The provided type is not supported by this action class, provided types are:
            ${this.supportedActionTypes}`);
        }

        /**
         * Create type and add variant suffix.
         */
        let actionType: string;
        switch (type) {
            case "LoadAll":
                actionType = this.loadAllType;
                break;
            case "LoadOne":
                actionType = this.loadOneType;
                break;
            case "CreateOne":
                actionType = this.createOneType;
                break;
            case "UpdateOne":
                actionType = this.updateOneType;
                break;
            case "DeleteOne":
                actionType = this.deleteOneType;
                break;
            default:
                throw new Error(`Provided action type '${type}' is not supported`);
        }

        if (variant === "success") {
            actionType = this.getSuccessVariant(actionType);
        } else if (variant === "error") {
            actionType = this.getErrorVariant(actionType);
        }

        return actionType;
    }

    private getSuccessVariant(actionType: string): string {
        return `${actionType} success`;
    }

    private getErrorVariant(actionType: string): string {
        return `${actionType} error`;
    }

    /*    public validatePayload<P>(actionType: GenericActionTypes, payload: P): boolean {
            if (this.payloadValidators == null || this.payloadValidators.get(actionType) == null) {
                // there are no validators at all or not a specific one for the actionType
                return true;
            }

            const payloadValidator = this.payloadValidators.get(actionType);
            return payloadValidator(payload);
        }

        public getSupportedActionTypesList(): string[] {
            const supportedTypes = this.supportedActionTypes || DEFAULT_SUPPORTED_ACTION_TYPES;
            const supportedTypeStrings = supportedTypes.map(this.getActionType.bind(this));
            const supportedActionTypesList: string[] = [];
            supportedTypeStrings.forEach((type: string) => {
                supportedActionTypesList.concat(...[type, this.getSuccessVariant(type), this.getErrorVariant(type)]);
            });
            return supportedActionTypesList;
        }*/
}
