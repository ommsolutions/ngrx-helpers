import {ComponentFixture, TestBed} from "@angular/core/testing";
import {CONFIG} from "../../config/ngrx-helpers.config";
import {NgrxHelpersModule} from "@omm/ngrx-helpers";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {PlantsEffects} from "../../effects";
import {ANGULAR_IMPORTS, getNgrxImports} from "../../../lib-tests/test-module";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material";
import {PlantInfoComponent} from "./plant-info.component";
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe("Plant Info Component", () => {

    let component: PlantInfoComponent;
    let fixture: ComponentFixture<PlantInfoComponent>;
    let dialogSpy: SpyObj<MatDialogRef<PlantInfoComponent>>;
    let data: { parent: number };

    const plant = {
        "id": 1,
        "city": "Devonstad",
        "zipCode": "78179",
        "street": "Audie Glens",
        "country": "Lesotho",
        "description": "provident fugiat voluptas"
    };

    beforeEach(() => {
        dialogSpy = createSpyObj("MatDialogRef", ["close"]);

        TestBed.configureTestingModule({
            declarations: [PlantInfoComponent],
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
                useValue: {plant}
            }]
        }).compileComponents();

        fixture = TestBed.createComponent(PlantInfoComponent);
        component = fixture.componentInstance;
        data = TestBed.get(MAT_DIALOG_DATA);
    });

    it("Should create the component", () => {
        expect(component).toBeDefined();
        expect(component.plant).toEqual(plant);
    });

    it("Should call close on dialogRef", () => {
        component.dismiss();
        expect(dialogSpy.close.calls.count()).toEqual(1);
    });
});
