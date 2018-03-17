import {ComponentFixture, TestBed} from "@angular/core/testing";
import {CONFIG} from "../../config/ngrx-helpers.config";
import {NgrxHelpersModule} from "@omm/ngrx-helpers";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {PlantsEffects} from "../../effects";
import {ANGULAR_IMPORTS, getNgrxImports} from "../../../lib-tests/test-module";
import {MatDialogModule} from "@angular/material";
import {ITableDefinition} from "../index";
import {TableComponent} from "./table.component";

describe("Add Machine Component", () => {

    let component: TableComponent;
    let fixture: ComponentFixture<TableComponent>;

    const tableDefinition: ITableDefinition = {
        columns: [{
            name: "id",
            hidden: true
        }, {
            name: "price",
            hidden: false
        }, {
            name: "lastFailure",
            hidden: false
        }, {
            name: "ip",
            hidden: false
        }, {
            name: "mac",
            hidden: false
        }, {
            name: "plantId",
            hidden: false
        }]
    };

    const tableData = [{"test": 1}];

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TableComponent],
            imports: [
                ...ANGULAR_IMPORTS,
                MatDialogModule,
                ...getNgrxImports([PlantsEffects]),
                HttpClientTestingModule,
                NgrxHelpersModule.forRoot(CONFIG)
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TableComponent);
        component = fixture.componentInstance;
        component.tableData = tableData;
        component.tableDefinition = tableDefinition;
        fixture.detectChanges();
    });

    it("Should create the component", () => {
        expect(component).toBeDefined();
        expect(component.tableData).toBeDefined();
        expect(component.tableData).toEqual(tableData);
        expect(component.tableDefinition).toBeDefined();
        expect(component.tableDefinition).toEqual(tableDefinition);
    });

    it("Should filter for visible columns", () => {
        const expected = ["price", "lastFailure", "ip", "mac", "plantId"];
        const result = component.visibleColumns;
        expect(result).toBeDefined();
        expect(result).toEqual(expected);
    });
});
