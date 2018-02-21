import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {INgrxHelpersModuleOptions} from "../ngrx-helpers.module";
import {ROOT_MODULE_CONFIG} from "../tokens";
import {GenericAction} from "../resource/generic.resource";

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

    public execute<R>(action: GenericAction, path: string, id?: number): Observable<R> {
        switch (action) {
            case "LoadAll": {
                return this.getResource<R>(path);
            }
            case "LoadOne": {
                return this.getResource<R>(path, id);
            }
            case "DeleteOne": {
                return this.deleteResource<R>(path, id);
            }
        }
    }

    public getResource<R>(path: string, id?: number): Observable<R> {
        let resourceUrl = `${this.apiBasePath}${path}`;
        resourceUrl = id != null ? resourceUrl + `/${id}` : resourceUrl;
        return this.http.get<R>(resourceUrl);
    }

    public deleteResource<R>(path: string,  id: number): Observable<R> {
        return this.http.delete<R>(`${this.apiBasePath}${path}/${id}`);
    }
}
