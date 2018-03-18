import {ComponentFixture, TestBed} from "@angular/core/testing";
import {CONFIG} from "../../config/ngrx-helpers.config";
import {DispatchService, NgrxHelpersModule} from "@omm/ngrx-helpers";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialog, MatDialogModule} from "@angular/material";
import {ActivatedRoute, convertToParamMap, ParamMap} from "@angular/router";
import {Store} from "@ngrx/store";
import {ANGULAR_IMPORTS, getNgrxImports} from "../../../lib-tests/test-module";
import {MachinesComponent} from "./machines.component";
import {NavigatorService} from "../../services";
import {TableComponent} from "../../component/table";
import {MachinesResource} from "../../resources/machines.resource";
import {createAction} from "../../../../src/utils";
import {IState} from "../../reducers";
import {Subject} from "rxjs/Subject";
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import {AddMachineComponent} from "../../component/add-machine";

describe("Machines Component", () => {

    let component: MachinesComponent;
    let fixture: ComponentFixture<MachinesComponent>;
    let dialogSpy: SpyObj<MatDialog>;
    let dispatchSpy: SpyObj<DispatchService>;
    const paramMap: Subject<ParamMap> = new Subject<ParamMap>();
    const routeStub = {
        data: null,
        paramMap: paramMap
    };

    const machines = [{
        id: 1,
        price: "277.00",
        lastFailure: "2017-08-10T23:05:06.126Z",
        ip: "172.27.249.20",
        mac: "5a:c7:db:72:00:76",
        plantId: 1
    }, {
        id: 2,
        price: "800.00",
        lastFailure: "2017-03-06T22:06:36.738Z",
        ip: "202.171.96.70",
        mac: "30:94:60:3d:e5:55",
        plantId: 1
    }];

    beforeEach(() => {
        dialogSpy = createSpyObj("MatDialog", ["open", "closeAll"]);
        dispatchSpy = createSpyObj("DispatchService", ["dispatch", "dispatchComplex"]);

        TestBed.configureTestingModule({
            declarations: [MachinesComponent, TableComponent],
            imports: [
                ...ANGULAR_IMPORTS,
                MatDialogModule,
                ...getNgrxImports([]),
                HttpClientTestingModule,
                NgrxHelpersModule.forRoot(CONFIG)
            ],
            providers: [{
                provide: MatDialog,
                useValue: dialogSpy
            }, {
                provide: DispatchService,
                useValue: dispatchSpy
            }, {
                provide: ActivatedRoute,
                useValue: routeStub
            }, {
                provide: NavigatorService,
                useValue: {
                    navigateToMachine: () => {
                    }
                }
            }]
        });

        fixture = TestBed.createComponent(MachinesComponent);
        component = fixture.componentInstance;
    });

    it("Should create the component", () => {
        expect(component).toBeDefined();
    });

    it("Should get machines from store", (done) => {
        const store: Store<IState> = TestBed.get(Store);
        const action = {
            ...createAction(MachinesResource, "LoadAll", undefined, undefined, "success"),
            response: machines
        };
        store.dispatch(action);

        fixture.whenStable()
            .then(() => component.machines$.subscribe(
                elements => {
                    console.log("ELEMENTS", elements);
                    expect(elements).toEqual(machines);
                    done();
                },
                () => fail("Should not error"),
                () => fail("Should not complete")
                )
            );
    });

    it("Should unsubscribe on destroy", () => {
        console.log("Comp", component);
        fixture.detectChanges();
        const cms = component.closeModal$.subscribe(undefined, () => fail("Should not error"));
        component.ngOnDestroy();
        expect(cms.closed).toEqual(true);
    });

    it("Should dispatch complex action if path param is provided", () => {
        component.ngOnInit();
        paramMap.next(convertToParamMap({id: "8"}));
        expect(dispatchSpy.dispatchComplex).toHaveBeenCalledWith(MachinesResource, "LoadAll", undefined, Object({parentRef: "8"}));
        expect(component.parent).toEqual(8);
    });

    it("Should dispatch LoadAll if no param is provided", () => {
        component.ngOnInit();
        paramMap.next(convertToParamMap({}));
        expect(dispatchSpy.dispatch).toHaveBeenCalledWith(MachinesResource, "LoadAll");
        expect(component.parent).toBeUndefined();
    });

    it("Should close modal on action", () => {
        const action = {
            ...createAction(MachinesResource, "CreateOne", undefined, undefined, "success"),
            response: {id: 6}
        };
        const store: Store<IState> = TestBed.get(Store);
        store.dispatch(action);

        component.closeModal$.subscribe(
            () => expect(dialogSpy.closeAll).toHaveBeenCalled(),
            () => fail("Should not error")
        );
    });

    it("Should open modal with correct parent", (done) => {
        component.ngOnInit();
        paramMap.next(convertToParamMap({id: "8"}));
        fixture.whenStable().then(() => {
            component.openAddMachineModal();
            console.log("Component", component.parent);
            expect(dialogSpy.open).toHaveBeenCalledWith(AddMachineComponent, {data: {parent: 8}});
            done();
        });
    });

    it("Should dispatch delete action", () => {
        component.deleteMachine(5);
        expect(dispatchSpy.dispatch).toHaveBeenCalledWith(MachinesResource, "DeleteOne", {id: 5});
    });
// deleteMachine dispatch
});
