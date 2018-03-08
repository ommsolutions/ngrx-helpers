import {TestBed} from "@angular/core/testing";
import {getNgrxImports} from "./test-module";
import {RestHelperService} from "../../src/services";
import {EffectHelperService, GenericAction, NgrxHelpersModule} from "@omm/ngrx-helpers";
import {PlantsEffects} from "../app/effects";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CONFIG} from "../app/config/ngrx-helpers.config";
import {TestResource} from "./test-resources";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/from";
import {createAction} from "../../src/utils";
import {map, tap} from "rxjs/operators";
import {Action} from "@ngrx/store";

describe("Effect helper service", () => {

    let effectHelperService: EffectHelperService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [...getNgrxImports([PlantsEffects]), HttpClientTestingModule, NgrxHelpersModule.forRoot(CONFIG)],
            providers: [RestHelperService, EffectHelperService]
        }).compileComponents();
    });

    it("Should select the correct actions", (done) => {
        effectHelperService = TestBed.get(EffectHelperService);
        expect(effectHelperService).toBeTruthy();

        const testResource = new TestResource();
        const allowedActions: GenericAction[] = ["LoadAll", "DeleteOne"];
        const genericSelector = effectHelperService.selectAction(TestResource, allowedActions);

        createAction(TestResource, "LoadAll");
        const actions: GenericAction[] = ["LoadAll", "UpdateOne", "CreateOne", "DeleteOne"];
        Observable.from(actions)
            .pipe(
                map(action => createAction(TestResource, action)),
                genericSelector,
                tap((action: Action) => expect(
                    allowedActions.map(allowedAction => testResource.getActionType(allowedAction))
                ).toContain(action.type))
            ).subscribe(undefined, undefined, done);
    });
});
