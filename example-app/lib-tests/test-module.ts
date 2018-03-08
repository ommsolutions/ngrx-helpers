import {RouterStateSerializer, StoreRouterConnectingModule} from "@ngrx/router-store";
import {NgrxHelpersModule} from "@omm/ngrx-helpers";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {ROUTER_CONFIG, ROUTES} from "../app/config/router.config";
import {CONFIG} from "../app/config/ngrx-helpers.config";
import {CustomRouterSerializer} from "../app/reducers/router";
import {environment} from "../environments/environment";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {metaReducers, reducers} from "../app/reducers";
import {NavigatorService, NotificationsService} from "../app/services";
import {EffectsModule} from "@ngrx/effects";
import {CustomMaterialModule} from "../app/custom-material.module";
import {BrowserModule} from "@angular/platform-browser";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {APP_BASE_HREF, CommonModule, Location} from "@angular/common";
import {StoreModule} from "@ngrx/store";
import {COMPONENTS, CONTAINERS, EFFECTS} from "../app/app.module";

export const ANGULAR_IMPORTS = [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    CustomMaterialModule,
    FormsModule
];

export function getNgrxImports(effects) {
    return [
        StoreModule.forRoot(reducers, {metaReducers}),
        StoreDevtoolsModule.instrument({
            name: "ngrx-helpers-example-app",
            logOnly: environment.production
        }),
        EffectsModule.forRoot(effects)
    ];
}

export const NGRX_IMPORTS = [
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreDevtoolsModule.instrument({
        name: "ngrx-helpers-example-app",
        logOnly: environment.production
    }),
    EffectsModule.forRoot(EFFECTS)
];

export const ROUTER_IMPORTS = [
    RouterModule.forRoot(ROUTES),
    StoreRouterConnectingModule.forRoot(ROUTER_CONFIG),
];

export const ALL_IMPORTS = [
    ...ANGULAR_IMPORTS,
    HttpClientModule,
    ...NGRX_IMPORTS,
    ...ROUTER_IMPORTS,
    NgrxHelpersModule.forRoot(CONFIG)
];

export const ALL_DECLARATIONS = [
    [
        ...CONTAINERS,
        ...COMPONENTS
    ]
];

export const ALL_PROVIDERS = [
    NavigatorService,
    Location,
    NotificationsService,
    {provide: RouterStateSerializer, useClass: CustomRouterSerializer},
    {provide: APP_BASE_HREF, useValue: "/"}

];

export const FULL_MODULE = {
    imports: ALL_IMPORTS,
    declarations: ALL_DECLARATIONS,
    providers: ALL_PROVIDERS
};
