import {TestBed} from "@angular/core/testing";
import {getNgrxImports} from "./test-module";
import {RestHelperService} from "../../src/services";
import {NgrxHelpersModule} from "@omm/ngrx-helpers";
import {PlantsEffects} from "../app/effects";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {CONFIG} from "../app/config/ngrx-helpers.config";
import "rxjs/add/observable/from";
import {HttpClient} from "@angular/common/http";
import {selectId} from "./test-resources";

describe("REST helper service", () => {

    let restHelperService: RestHelperService;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    const endpoint = "/test";
    const fullPath = `${CONFIG.apiBasePath}${endpoint}`;

    beforeEach(() => {
        spyOn(console, "warn");

        TestBed.configureTestingModule({
            imports: [...getNgrxImports([PlantsEffects]), HttpClientTestingModule, NgrxHelpersModule.forRoot(CONFIG)],
            providers: [RestHelperService]
        }).compileComponents();
        restHelperService = TestBed.get(RestHelperService);
        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it("Should use base path from config", () => {
        expect(restHelperService).toBeDefined();
        expect(restHelperService.apiBasePath).toBeDefined();
        expect(restHelperService.apiBasePath).toEqual(CONFIG.apiBasePath);
    });

    it("Should should warn user, if no base path is configured", () => {
        const brokenResetHelperService = new RestHelperService(undefined, {});
        expect(brokenResetHelperService).toBeDefined();
        expect(console.warn).toHaveBeenCalled();
    });

    it("Should execute LoadOne action", () => {
        const response = {test: "success"};
        const payload = {id: 5};
        restHelperService.execute<{ test: string }>("LoadOne", endpoint, payload)
            .subscribe(res => expect(res.test).toEqual("success"));

        const req = httpTestingController.expectOne(fullPath + "/" + payload.id);
        expect(req.request.method).toEqual("GET");
        req.flush(response);
    });

    it("Should execute LoadAll action", () => {
        const response = [{test: "success"}, {test: "success2"}];
        restHelperService.execute<{ test: string }[]>("LoadAll", endpoint)
            .subscribe(res => expect(res[1].test).toEqual("success2"));

        const req = httpTestingController.expectOne(fullPath);
        expect(req.request.method).toEqual("GET");
        req.flush(response);
    });

    it("Should execute DeleteOne action", () => {
        const response = {msg: "success"};
        const payload = {id: 5};
        restHelperService.execute<{ msg: string }>("DeleteOne", endpoint, payload)
            .subscribe(res => expect(res.msg).toEqual("success"));

        const req = httpTestingController.expectOne(fullPath + "/" + payload.id);
        expect(req.request.method).toEqual("DELETE");
        req.flush(response);
    });

    it("Should execute UpdateOne action", () => {
        const response = {test: "success"};
        const payload = {id: 5};
        restHelperService.execute<{ test: string }>("UpdateOne", endpoint, payload)
            .subscribe(res => expect(res.test).toEqual("success"));

        const req = httpTestingController.expectOne(fullPath + "/" + selectId(<any>payload));
        expect(req.request.method).toEqual("PUT");
        req.flush(response);
    });

    it("Should execute CreateOne action", () => {
        const payload = {test: "success"};
        restHelperService.execute<{ test: string }>("CreateOne", endpoint, payload)
            .subscribe(res => expect(res.test).toEqual("success"));

        const req = httpTestingController.expectOne(fullPath);
        expect(req.request.method).toEqual("POST");
        req.flush({...payload, id: 6});
    });
});
