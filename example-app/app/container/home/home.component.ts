import {Component} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {StoreHelperService} from "ngrx-helpers";

import {getStudentList, IState} from "../../reducers";
import {StudentsAction} from "../../actions/students.action";

@Component({
    selector: "app-home",
    templateUrl: "home.component.html",
    styleUrls: ["home.component.scss"]
})
export class HomeComponent {
    public students;

    constructor(private store: Store<IState>, private restHelperService: StoreHelperService) {
        this.students = this.store.pipe(select(getStudentList));
    }

    loadStudents() {
        this.restHelperService.getAll(StudentsAction);
    }
}
