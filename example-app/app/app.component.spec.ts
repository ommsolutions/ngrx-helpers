import {async, TestBed} from "@angular/core/testing";
import {AppComponent} from "./app.component";
import {CustomMaterialModule} from "./custom-material.module";
import {ROUTER_CONFIG, ROUTES} from "./config/router.config";
import {RouterStateSerializer, StoreRouterConnectingModule} from "@ngrx/router-store";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {StoreModule} from "@ngrx/store";
import {metaReducers, reducers} from "./reducers";
import {DataService, NavigatorService, NotificationsService} from "./services";
import {COMPONENTS, CONTAINERS, EFFECTS} from "./app.module";
import {NgrxHelpersModule} from "@omm/ngrx-helpers";
import {FormsModule} from "@angular/forms";
import {environment} from "../environments/environment";
import {HttpClientModule} from "@angular/common/http";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {APP_BASE_HREF, CommonModule, Location} from "@angular/common";
import {CONFIG} from "./config/ngrx-helpers.config";
import {CustomRouterSerializer} from "./reducers/router";

describe("AppComponent", () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
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
            declarations: [
                ...CONTAINERS,
                ...COMPONENTS
            ],
            providers: [
                DataService,
                NavigatorService,
                Location,
                NotificationsService,
                {provide: RouterStateSerializer, useClass: CustomRouterSerializer},
                {provide: APP_BASE_HREF, useValue: "/"}

            ],
        }).compileComponents();
    }));

    it("Should create the app", async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
