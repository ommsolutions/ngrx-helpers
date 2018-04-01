import {Component} from "@angular/core";
import {NavigatorService} from "./services";
import {environment} from "../environments/environment";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {
    public title = "ngrx-helpers example app";
    public version = environment.version;

    constructor(private Navigator: NavigatorService) {
    }

    openConfig() {
        this.Navigator.navigateToConfig();
    }
}
