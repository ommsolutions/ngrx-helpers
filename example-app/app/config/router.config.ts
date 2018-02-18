import {Routes} from "@angular/router";
import {HomeComponent} from "../container/home";
import {ConfigComponent} from "../container/config";

/**
 * The selector for the router sub state.
 */
export const ROUTER_CONFIG = {
    stateKey: "router"
};

/**
 * All routes which are provided by this app
 */
export const ROUTES: Routes = [
    {path: "home", component: HomeComponent},
    {path: "config", component: ConfigComponent},
    {path: "**", component: HomeComponent},

];
