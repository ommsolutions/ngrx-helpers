import {async, TestBed} from "@angular/core/testing";
import {AppComponent} from "./app.component";
import {FULL_MODULE} from "../lib-tests/test-module";
import {NavigatorService, NotificationsService} from "./services";
import {RouterStateSerializer} from "@ngrx/router-store";
import {APP_BASE_HREF, Location} from "@angular/common";
import {CustomRouterSerializer} from "./reducers/router";
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe("AppComponent", () => {
    let app: AppComponent;
    let navigatorSpy: SpyObj<NavigatorService>;

    beforeEach(async(() => {
        navigatorSpy = createSpyObj("NavigatorService", ["navigateToConfig"]);

        const {declarations, imports} = FULL_MODULE;
        const providers = [
            {provide: NavigatorService, useValue: navigatorSpy},
            Location,
            NotificationsService,
            {provide: RouterStateSerializer, useClass: CustomRouterSerializer},
            {provide: APP_BASE_HREF, useValue: "/"}
        ];

        TestBed.configureTestingModule({providers, declarations, imports});
        const fixture = TestBed.createComponent(AppComponent);
        app = fixture.componentInstance;
    }));

    it("Should create the app", async(() => {
        expect(app).toBeTruthy();
    }));

    it("Should navigate to config", () => {
        app.openConfig();
        expect(navigatorSpy.navigateToConfig).toHaveBeenCalled();
    });
});
