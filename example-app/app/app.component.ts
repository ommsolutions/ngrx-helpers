import {Component} from "@angular/core";
import {select, Store} from "@ngrx/store";

import {getStudentList, IState} from "./reducers";
import {StudentsAction} from "./actions/students.action";
import {StoreHelperService} from "../../src";


@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    public title = "ngrx-helpers example app";
    public students;


    constructor(private store: Store<IState>, private restHelperService: StoreHelperService) {
        this.students = this.store.pipe(select(getStudentList));
    }

    loadStudents() {
        this.restHelperService.getAll(StudentsAction);
    }
}
