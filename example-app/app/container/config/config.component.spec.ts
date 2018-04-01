import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {NgrxHelpersModule} from "@omm/ngrx-helpers";
import {ANGULAR_IMPORTS, getNgrxImports} from "../../../lib-tests/test-module";
import {CONFIG} from "../../config/ngrx-helpers.config";
import {ConfigComponent} from "./config.component";
import {NavigatorService} from "../../services";

describe("ConfigComponent", () => {
    let component: ConfigComponent;
    let fixture: ComponentFixture<ConfigComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ConfigComponent],
            imports: [
                ...ANGULAR_IMPORTS,
                ...getNgrxImports([]),
                HttpClientTestingModule,
                NgrxHelpersModule.forRoot(CONFIG)
            ],
            providers: [NavigatorService]
        }).compileComponents();

        fixture = TestBed.createComponent(ConfigComponent);
        component = fixture.componentInstance;
    });

    it("Should create component", () => {
        expect(component).toBeDefined();
    });

    it("Should have custom and default config", () => {
        expect(component.config).toBeDefined();
        expect(component.default).toBeDefined();
        expect(component.config.apiBasePath).toEqual(CONFIG.apiBasePath);
    });
});
