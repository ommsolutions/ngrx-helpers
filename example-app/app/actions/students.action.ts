import {GenericAction} from "ngrx-helpers";
import {resourceDefinition} from "../../../src/utils";

@resourceDefinition("Students", "/students")
export class StudentsAction extends GenericAction {
}
