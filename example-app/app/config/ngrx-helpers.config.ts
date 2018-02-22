import {DEFAULT_CONFIG, INgrxHelpersModuleOptions} from "@omm/ngrx-helpers";

/** The config which should be used for the ngrx-helpers module. */
export const CONFIG: INgrxHelpersModuleOptions = {apiBasePath: "http://localhost:3000"};
/** The fallback config exposed by the ngrx-helpers module. */
export const DEFAULT: INgrxHelpersModuleOptions = DEFAULT_CONFIG;
