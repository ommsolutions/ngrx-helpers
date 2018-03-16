import {ComponentFixture, TestBed} from "@angular/core/testing";
import {CONFIG} from "../../config/ngrx-helpers.config";
import {DispatchService, NgrxHelpersModule} from "@omm/ngrx-helpers";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {PlantsEffects} from "../../effects";
import {ANGULAR_IMPORTS, getNgrxImports} from "../../../lib-tests/test-module";
import {AddMachineComponent} from "./add-machine.component";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material";
import {MachinesResource} from "../../resources/machines.resource";
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import Spy = jasmine.Spy;

describe("Add Machine Component", () => {

    let component: AddMachineComponent;
    let fixture: ComponentFixture<AddMachineComponent>;
    let dialogSpy: SpyObj<MatDialogRef<AddMachineComponent>>;
    let dispatchSpy: Spy;
    let data: { parent: number };

    const validMachine = {
        ip: "192.168.2.2",
        price: "511",
        mac: "5a:c7:db:72:00:76",
        lastFailure: "2017-08-10T23:05:06.126Z"
    };

    beforeEach(() => {
        dialogSpy = createSpyObj("MatDialogRef", ["close"]);
        dispatchSpy = createSpyObj("DispatchService", ["dispatch"]);

        TestBed.configureTestingModule({
            declarations: [AddMachineComponent],
            imports: [
                ...ANGULAR_IMPORTS,
                MatDialogModule,
                ...getNgrxImports([PlantsEffects]),
                HttpClientTestingModule,
                NgrxHelpersModule.forRoot(CONFIG)
            ],
            providers: [{
                provide: MatDialogRef,
                useValue: dialogSpy
            }, {
                provide: MAT_DIALOG_DATA,
                useValue: {parent: 6}
            }, {
                provide: DispatchService,
                useValue: dispatchSpy
            }]
        }).compileComponents();

        fixture = TestBed.createComponent(AddMachineComponent);
        component = fixture.componentInstance;
        data = TestBed.get(MAT_DIALOG_DATA);
    });

    it("Should create the component", () => {
        expect(component).toBeDefined();
        expect(component.parent).toEqual(6);
    });

    it("Should mark machine as valid", () => {
        const valid = component.isValid(validMachine);
        expect(valid).toEqual(true);
    });

    it("Should mark invalid machine as invalid", () => {
        const valid = component.isValid({...validMachine, ip: undefined});
        expect(valid).toEqual(false);
    });

    it("Should call close on dialogRef", () => {
        component.dismiss();
        expect(dialogSpy.close.calls.count()).toEqual(1);
    });

    it("Should dispatch correct action on save", () => {
        component.save(validMachine);
        expect((<any>dispatchSpy).dispatch)
            .toHaveBeenCalledWith(MachinesResource, "CreateOne", {...validMachine, plantId: data.parent});
    });
});
