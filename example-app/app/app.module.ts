import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule, Location} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";
import {RouterStateSerializer, StoreRouterConnectingModule} from "@ngrx/router-store";
import {NgrxHelpersModule} from "ngrx-helpers";

import {CustomMaterialModule} from "./custom-material.module";
import {environment} from "../environments/environment";
import {AppComponent} from "./app.component";
import {metaReducers, reducers} from "./reducers";
import {CustomRouterSerializer} from "./reducers/router";
import {StudentsEffect, RouterEffects} from "./effects";
import {DataService, NavigatorService} from "./services";
import {HomeComponent} from "./container/home";
import {ConfigComponent} from "./container/config";
import {MachineComponent} from "./container/machine";
import {MachinesComponent} from "./container/machines";
import {ProductionLinesComponent} from "./container/production-lines";
import {ROUTER_CONFIG, ROUTES} from "./config/router.config";
import {CONFIG} from "./config/ngrx-helpers.config";

/**
 * Lists all components which represent a complete content area and can be accessible via route
 */
const CONTAINERS = [
    AppComponent,
    HomeComponent,
    ConfigComponent,
    MachineComponent,
    MachinesComponent,
    ProductionLinesComponent
];

/**
 * Lists all components which represent common functionality used in more than one component (e.g. a table)
 */
const COMPONENTS = [];

const EFFECTS = [StudentsEffect, RouterEffects];

@NgModule({
    declarations: [
        ...CONTAINERS,
        ...COMPONENTS
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        CustomMaterialModule,
        HttpClientModule,
        StoreModule.forRoot(reducers, {metaReducers}),
        StoreDevtoolsModule.instrument({
            name: "ngrx-helpers-example-app",
            logOnly: environment.production
        }),
        RouterModule.forRoot(ROUTES),
        StoreRouterConnectingModule.forRoot(ROUTER_CONFIG),
        EffectsModule.forRoot(EFFECTS),
        NgrxHelpersModule.forRoot(CONFIG)
    ],
    providers: [
        DataService,
        NavigatorService,
        Location,
        {provide: RouterStateSerializer, useClass: CustomRouterSerializer}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
