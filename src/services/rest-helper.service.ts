import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs/Observable";

const API_PATH = "http://localhost:3000";

@Injectable()
export class RestHelperService {
    constructor(private http: HttpClient) {

    }

    loadAll<R>(path: string): Observable<R> {
        return this.http.get<R>(`${API_PATH}${path}`)
            .pipe(map(response => {
                console.log("res", response);
                return response;
            }));
    }
}
