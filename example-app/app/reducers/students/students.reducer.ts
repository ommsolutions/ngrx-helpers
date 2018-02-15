import {ExtendedAction, ReducerHelper} from "ngrx-helpers";

import {StudentsAction} from "../../actions/students.action";

export interface IStudent {
    id: number;
    firstName: string;
    lastName: string;
}

export interface IState {
    studentList: IStudent[];
}

const initialState: IState = {
    studentList: []
};

export function reducer(state: IState = initialState, action: ExtendedAction<any>): IState {
    return ReducerHelper.genericReducer(state, action, StudentsAction);
}

export const getStudentList = (state: IState) => state.studentList;
