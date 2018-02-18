import {InjectionToken} from "@angular/core";
import {INgrxHelpersModuleOptions} from "ngrx-helpers";

export const ROOT_MODULE_CONFIG = new InjectionToken<INgrxHelpersModuleOptions>(
    "@omm/ngrx-helpers: Root Module Configuration"
);
