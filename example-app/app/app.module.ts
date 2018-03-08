import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule, Location} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";
import {RouterStateSerializer, StoreRouterConnectingModule} from "@ngrx/router-store";
import {NgrxHelpersModule} from "@omm/ngrx-helpers";

import {environment} from "../environments/environment";
import {CustomMaterialModule} from "./custom-material.module";
import {AppComponent} from "./app.component";
import {ConfigComponent, HomeComponent, MachineComponent, MachinesComponent, PlantsComponent} from "./container";
import {AddMachineComponent, PlantInfoComponent, TableComponent} from "./component";
import {metaReducers, reducers} from "./reducers";
import {CustomRouterSerializer} from "./reducers/router";
import {MachinesEffects, NotificationEffects, PlantsEffects, RouterEffects} from "./effects";
import {NavigatorService, NotificationsService} from "./services";
import {ROUTER_CONFIG, ROUTES} from "./config/router.config";
import {CONFIG} from "./config/ngrx-helpers.config";

/**
 * Lists all components which represent a complete content area and can be accessible via route
 */
export const CONTAINERS = [
    AppComponent,
    HomeComponent,
    ConfigComponent,
    MachineComponent,
    MachinesComponent,
    PlantsComponent,
];

/**
 * Lists all components which represent common functionality used in more than one component (e.g. a table)
 */
export const COMPONENTS = [
    TableComponent,
    PlantInfoComponent,
    AddMachineComponent
];

export const EFFECTS = [NotificationEffects, RouterEffects, MachinesEffects, PlantsEffects];

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
        FormsModule,
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
        NavigatorService,
        Location,
        NotificationsService,
        {provide: RouterStateSerializer, useClass: CustomRouterSerializer}
    ],
    entryComponents: [PlantInfoComponent, AddMachineComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
