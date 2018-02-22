import {Routes} from "@angular/router";
import {HomeComponent} from "../container/home";
import {ConfigComponent} from "../container/config";
import {PlantsComponent} from "../container/plants";
import {MachinesComponent} from "../container/machines";
import {MachineComponent} from "../container/machine";

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
    {path: "plants", component: PlantsComponent},
    {path: "plants/:id/machines", component: MachinesComponent},
    {path: "machines", component: MachinesComponent},
    {path: "machines/:id", component: MachineComponent},
    {path: "**", component: HomeComponent},
];
