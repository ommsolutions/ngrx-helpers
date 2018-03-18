import {async, TestBed} from "@angular/core/testing";
import {NavigatorService} from "./index";
import {IState} from "../reducers";
import {Store} from "@ngrx/store";
import * as RouterActions from "../actions/router.actions";
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;
import {Go} from "../actions/router.actions";

describe("Navigator Service", () => {

    let navigatorService: NavigatorService;
    let storeSpy: SpyObj<Store<IState>>;

    beforeEach(async(() => {
        storeSpy = createSpyObj("Store", ["dispatch"]);

        TestBed.configureTestingModule({
            providers: [
                NavigatorService, {
                    provide: Store,
                    useValue: storeSpy
                }]
        });
        navigatorService = TestBed.get(NavigatorService);
    }));

    it("Should navigate back", () => {
        navigatorService.back();
        expect(storeSpy.dispatch).toHaveBeenCalledWith(new RouterActions.Back());
    });

    it("Should navigate to config", () => {
        navigatorService.navigateToConfig();
        expect(storeSpy.dispatch).toHaveBeenCalledWith(new Go({path: ["./config"]}));
    });

    it("Should navigate to plants", () => {
        navigatorService.navigateToPlants();
        expect(storeSpy.dispatch).toHaveBeenCalledWith(new Go({path: ["./plants"]}));
    });

    it("Should navigate to plant", () => {
        navigatorService.navigateToPlant(2);
        expect(storeSpy.dispatch).toHaveBeenCalledWith(new Go({path: ["./plants/2/machines"]}));
    });

    it("Should navigate to machine", () => {
        navigatorService.navigateToMachine(6);
        expect(storeSpy.dispatch).toHaveBeenCalledWith(new Go({path: ["./machines/6"]}));
    });

    it("Should navigate to machines", () => {
        navigatorService.navigateToMachines();
        expect(storeSpy.dispatch).toHaveBeenCalledWith(new Go({path: ["./machines"]}));
    });
});
