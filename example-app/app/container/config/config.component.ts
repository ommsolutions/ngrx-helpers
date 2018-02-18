import {Component} from "@angular/core";
import {INgrxHelpersModuleOptions} from "@omm/ngrx-helpers";
import {CONFIG, DEFAULT} from "../../config/ngrx-helpers.config";
import {NavigatorService} from "../../services";

@Component({
    selector: "app-config",
    templateUrl: "config.component.html",
    styleUrls: ["config.component.scss"]
})
export class ConfigComponent {

    public configKeys: string[] = ["apiBasePath"];
    public default: INgrxHelpersModuleOptions = DEFAULT;
    public config: INgrxHelpersModuleOptions = CONFIG;

    constructor(private Navigator: NavigatorService) {
    }

    public goBack() {
        this.Navigator.back();
    }
}
