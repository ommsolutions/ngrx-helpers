import {GenericAction} from "ngrx-helpers";

export class StudentsAction extends GenericAction {
    public actionName = "Students";
    public resourcePath = "/students";
}
