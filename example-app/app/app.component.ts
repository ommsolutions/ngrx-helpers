import {Component} from "@angular/core";
import {NavigatorService} from "./services";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {
    public title = "ngrx-helpers example app";

    constructor(private Navigator: NavigatorService) {
    }

    openConfig() {
        this.Navigator.navigateToConfig();
    }
}
