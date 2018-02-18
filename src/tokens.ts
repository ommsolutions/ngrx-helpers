import {InjectionToken} from "@angular/core";
import {INgrxHelpersModuleOptions} from "@omm/ngrx-helpers";

export const ROOT_MODULE_CONFIG = new InjectionToken<INgrxHelpersModuleOptions>(
    "@omm/ngrx-helpers: Root Module Configuration"
);
