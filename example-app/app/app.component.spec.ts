import {async, TestBed} from "@angular/core/testing";
import {AppComponent} from "./app.component";
import {FULL_MODULE} from "../lib-tests/test-module";

describe("AppComponent", () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule(FULL_MODULE).compileComponents();
    }));

    it("Should create the app", async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
