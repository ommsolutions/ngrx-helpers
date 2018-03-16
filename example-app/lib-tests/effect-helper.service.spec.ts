import {TestBed} from "@angular/core/testing";
import {getNgrxImports} from "./test-module";
import {RestHelperService} from "../../src/services";
import {
    DispatchService,
    EffectHelperService,
    GenericAction,
    GenericResource,
    IErrorAction,
    ISuccessAction,
    NgrxHelpersModule,
    ResourceAction,
    resourceConfig
} from "@omm/ngrx-helpers";
import {PlantsEffects} from "../app/effects";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {CONFIG} from "../app/config/ngrx-helpers.config";
import {TestResource, ValidResourceConfig} from "./test-resources";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/from";
import "rxjs/add/observable/of";
import {createAction} from "../../src/utils";
import {map, mergeMap, tap} from "rxjs/operators";
import {Action} from "@ngrx/store";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs/Subject";
import {Actions} from "@ngrx/effects";
import {of} from "rxjs/observable/of";
import Spy = jasmine.Spy;

describe("Effect helper service", () => {

    const fullPath = `${CONFIG.apiBasePath}${ValidResourceConfig.resourcePath}`;
    const response = [{test: 1, id: 5}];
    const payload = {id: 5};
    const successResponse = {action: "LoadOne", response, payload};
    const errorResponse = {err: "An error occurred", action: "LoadOne", payload};
    const loadAllAction = createAction(TestResource, "LoadAll");
    const loadOneAction = createAction(TestResource, "LoadOne", payload);
    const loadAllChildAction = createAction(TestResource, "LoadAll", undefined, {parentRef: 2});

    @resourceConfig({...ValidResourceConfig, parentResource: TestResource, resourcePath: "/child"})
    class ChildResource extends GenericResource {
    }

    let effectHelperService: EffectHelperService;
    let restHelperService: RestHelperService;
    let executeRest: Spy;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let actions: Actions;
    let dispatchService: DispatchService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [...getNgrxImports([PlantsEffects]), HttpClientTestingModule, NgrxHelpersModule.forRoot(CONFIG)]
        });
        effectHelperService = TestBed.get(EffectHelperService);
        restHelperService = TestBed.get(RestHelperService);
        executeRest = spyOn(restHelperService, "execute").and.callThrough();
        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        actions = TestBed.get(Actions);
        dispatchService = TestBed.get(DispatchService);
    });

    it("Should select the correct actions", (done) => {
        expect(effectHelperService).toBeTruthy();

        const testResource = new TestResource();
        const allowedActions: GenericAction[] = ["LoadAll", "DeleteOne"];
        const genericSelector = effectHelperService.selectAction(TestResource, allowedActions);

        createAction(TestResource, "LoadAll");
        const actionList: GenericAction[] = ["LoadAll", "UpdateOne", "CreateOne", "DeleteOne"];
        Observable.from(actionList).pipe(
            map(action => createAction(TestResource, action)),
            genericSelector,
            tap((action: Action) => expect(
                allowedActions.map(allowedAction => testResource.getActionType(allowedAction))
            ).toContain(action.type))
        ).subscribe(undefined, undefined, done);
    });

    it("Should execute the correct request", (done) => {
        const subject: Subject<ResourceAction> = new Subject();
        subject.pipe(effectHelperService.executeRequest(TestResource)).subscribe(
            (res: ISuccessAction) => {
                expect(executeRest).toHaveBeenCalledWith("LoadAll", "/resource", undefined);
                expect(res.response).toBeDefined();
                expect(res.response.length).toEqual(1);
                done();
            },
            (err) => fail("Should not fail: " + err),
            () => fail("Should not complete"));

        subject.next(loadAllAction);
        const req = httpTestingController.expectOne(fullPath);
        req.flush(response);
        httpTestingController.verify();
    });

    it("Should execute the correct request with parent resource", (done) => {
        const subject: Subject<ResourceAction> = new Subject();
        subject.pipe(effectHelperService.executeRequest(ChildResource)).subscribe(
            (res: ISuccessAction) => {
                expect(executeRest).toHaveBeenCalledWith("LoadAll", "/resource/2/child", undefined);
                expect(res.response).toBeDefined();
                expect(res.response.length).toEqual(1);
                done();
            },
            (err) => fail("Should not fail: " + err),
            () => fail("Should not complete"));

        subject.next(loadAllChildAction);
        const req = httpTestingController.expectOne(fullPath + "/2" + new ChildResource().resourcePath);
        req.flush(response);
        httpTestingController.verify();
    });

    it("Should map the response correctly", (done) => {
        const subject: Subject<ResourceAction> = new Subject();
        subject.pipe(effectHelperService.executeRequest(TestResource)).subscribe(
            (res: ISuccessAction) => {
                expect(res.response).toBeDefined();
                expect(res.response.length).toEqual(1);
                expect(res.response[0].test).toEqual(response[0].test);

                expect(res.action).toBeDefined();
                expect(res.action).toEqual("LoadOne");

                expect(res.payload).toBeDefined();
                expect(res.payload.id).toEqual(5);
                done();
            },
            (err) => fail("Should not fail: " + err),
            () => fail("Should not complete"));

        subject.next(loadOneAction);
        const req = httpTestingController.expectOne(fullPath + "/" + loadOneAction.payload.id);
        req.flush(response);
        httpTestingController.verify();
    });

    it("Should wrap an error correctly", () => {
        const subject: Subject<ResourceAction> = new Subject();
        subject.pipe(effectHelperService.executeRequest(TestResource)).subscribe(
            () => fail("Should not emit"),
            (err: IErrorAction) => {
                expect(err.err).toBeDefined();
                expect(err.err).toContain("500");
                expect(err.err).toContain("Failure");

                expect(err.action).toBeDefined();
                expect(err.action).toEqual("LoadOne");

                expect(err.payload).toBeDefined();
                expect(err.payload.id).toEqual(5);
            },
            () => fail("Should not complete"));

        subject.next(loadOneAction);
        const req = httpTestingController.expectOne(fullPath + "/" + loadOneAction.payload.id);
        req.error(new ErrorEvent("intentional error"), {status: 500, statusText: "Failure!"});
        httpTestingController.verify();
    });

    it("Should create a success action correctly", (done) => {
        const subject: Subject<ResourceAction> = new Subject();
        subject.pipe(effectHelperService.handleSuccessResponse(TestResource)).subscribe(
            (res: ISuccessAction) => {
                expect(res.response).toBeDefined();
                expect(res.response.length).toEqual(1);
                expect(res.response[0].test).toEqual(response[0].test);

                expect(res.action).toBeDefined();
                expect(res.action).toEqual("LoadOne");

                expect(res.payload).toBeDefined();
                expect(res.payload.id).toEqual(5);

                expect(res.type).toBeDefined();
                expect(res.type).toEqual(new TestResource().getActionType("LoadOne", "success"));
                done();
            },
            (err) => fail("Should not fail: " + err),
            () => fail("Should not complete"));
        subject.next(<any>successResponse);
    });

    it("Should create an error action correctly", (done) => {
        const subject: Subject<ResourceAction> = new Subject();
        subject.pipe(mergeMap(action => of(action).pipe(
            tap(a => {
                // simulate an error inside the isolated observable chain.
                throw a;
            }),
            effectHelperService.handleErrorResponse(TestResource)))
        ).subscribe(
            (res: IErrorAction) => {
                expect(res.err).toBeDefined();
                expect(res.err).toEqual(errorResponse.err);

                expect(res.action).toBeDefined();
                expect(res.action).toEqual(errorResponse.action);
                expect(res.payload).toBeDefined();
                expect(res.payload).toEqual(errorResponse.payload);
                expect(res.type).toBeDefined();
                expect(res.type).toEqual(new TestResource().getActionType("LoadOne", "error"));
                done();
            },
            (err) => fail("Should not fail: " + JSON.stringify(err)),
            () => fail("Should not complete")
        );

        subject.next(<any>errorResponse);
    });

    it("Should handle successful responses", (done) => {
        effectHelperService.handle(actions, TestResource, ["LoadAll"])
            .subscribe(
                (res: ISuccessAction) => {
                    expect(res.response).toBeDefined();
                    expect(res.response).toEqual(response);
                    expect(res.action).toBeDefined();
                    expect(res.action).toEqual("LoadAll");
                    done();
                },
                (err) => fail("Should not fail: " + err),
                () => fail("Should not complete"));

        dispatchService.dispatch(TestResource, "LoadAll");
        const req = httpTestingController.expectOne(fullPath);
        req.flush(response);
        httpTestingController.verify();
    });

    it("Should handle errors", (done) => {
        effectHelperService.handle(actions, TestResource, ["LoadAll"])
            .subscribe(
                (res: IErrorAction) => {
                    expect(res.err).toBeDefined();
                    expect(res.err).toContain("Failure");
                    expect(res.action).toBeDefined();
                    expect(res.action).toEqual("LoadAll");
                    done();
                },
                (err) => fail("Should not fail: " + err),
                () => fail("Should not complete"));

        dispatchService.dispatch(TestResource, "LoadAll");
        const req = httpTestingController.expectOne(fullPath);
        req.error(new ErrorEvent("intentional error"), {status: 500, statusText: "Failure!"});
        httpTestingController.verify();
    });
});
