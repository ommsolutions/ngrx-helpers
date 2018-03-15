import {TestBed} from "@angular/core/testing";
import {Injectable} from "@angular/core";
import {DispatchService, EffectHelperService, NgrxHelpersModule} from "@omm/ngrx-helpers";
import {Actions, Effect} from "@ngrx/effects";
import {getNgrxImports} from "./test-module";
import {CONFIG} from "../app/config/ngrx-helpers.config";
import "rxjs/add/observable/from";
import {TestResource} from "./test-resources";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {tap} from "rxjs/operators";
import createSpy = jasmine.createSpy;


describe("Dispatch service", () => {

    @Injectable()
    class TestEffects {
        _tf;
        testSelector = this.effectHelperService.selectAction(TestResource, ["LoadAll"]);

        @Effect({dispatch: false})
        $testActionStream = this.actions$.pipe(
            this.testSelector,
            tap((action) => this._tf(action))
        );

        set testFunction(func: Function) {
            this._tf = func;
        }

        constructor(private actions$: Actions, private effectHelperService: EffectHelperService) {
        }
    }

    let dispatchService: DispatchService;
    let testEffects: TestEffects;
    let effectSpy;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [...getNgrxImports([TestEffects]), HttpClientTestingModule, NgrxHelpersModule.forRoot(CONFIG)],
            providers: []
        }).compileComponents();
        dispatchService = TestBed.get(DispatchService);
        testEffects = TestBed.get(TestEffects);
        effectSpy = createSpy("EffectSpy");
    });

    it("Should dispatch action", () => {
        testEffects.testFunction = effectSpy;
        dispatchService.dispatch(TestResource, "LoadAll");
        expect(effectSpy).toHaveBeenCalledWith({
            type: "ngrx-helpers: [TestResource] LoadAll - request",
            action: "LoadAll",
            payload: undefined,
            options: undefined
        });
    });

    it("Should dispatch complex action", () => {
        testEffects.testFunction = effectSpy;
        const payload = {id: 5};
        const options = {parentRef: 1};
        dispatchService.dispatchComplex(TestResource, "LoadAll", payload, options);
        expect(effectSpy).toHaveBeenCalledWith({
            type: "ngrx-helpers: [TestResource] LoadAll - request",
            action: "LoadAll",
            payload: payload,
            options: options
        });
    });
});
