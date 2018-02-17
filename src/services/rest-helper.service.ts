import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {ROOT_MODULE_CONFIG} from "../tokens";
import {INgrxHelpersModuleOptions} from "../ngrx-helpers.module";

@Injectable()
export class RestHelperService {

    private apiBasePath: string;

    constructor(private http: HttpClient, @Inject(ROOT_MODULE_CONFIG) config: INgrxHelpersModuleOptions) {
        if (!config.apiBasePath) {
            // TODO: optionally, define full path for each resource
            console.warn("REST Helper Servies wont work, because no base bath was provided");
        } else {
            this.apiBasePath = config.apiBasePath;
            console.log("Sending requests to ", this.apiBasePath);
        }
    }

    public loadAll<R>(path: string): Observable<R> {
        return this.http.get<R>(`${this.apiBasePath}${path}`);
    }
}
