import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map} from "rxjs/operators";

import {IStudent} from "../reducers/students";

const API_PATH = "http://localhost:3000";

@Injectable()
export class DataService {

    constructor(private http: HttpClient) {
    }

    loadAllStudents() {
        return this.http
            .get<IStudent[]>(`${API_PATH}/students`)
            .pipe(map(students => students || []));
    }
}
