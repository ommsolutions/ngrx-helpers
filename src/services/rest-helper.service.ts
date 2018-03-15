import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

import {ROOT_MODULE_CONFIG} from "../tokens";
import {IPayload} from "../utils";
import {INgrxHelpersModuleOptions} from "../ngrx-helpers.module";
import {GenericAction} from "../resource/generic.resource";

@Injectable()
export class RestHelperService {

    readonly apiBasePath: string;

    constructor(private http: HttpClient, @Inject(ROOT_MODULE_CONFIG) config: INgrxHelpersModuleOptions) {
        if (!config.apiBasePath) {
            // TODO: optionally, define full path for each resource
            console.warn("REST Helper Servies wont work, because no base bath was provided");
        } else {
            this.apiBasePath = config.apiBasePath;
            console.log("Sending requests to ", this.apiBasePath);
        }
    }

    public execute<R>(action: GenericAction, path: string, payload?: IPayload): Observable<R> {
        switch (action) {
            case "LoadAll": {
                return this.getResource<R>(path);
            }
            case "LoadOne": {
                return this.getResource<R>(path, payload.id);
            }
            case "DeleteOne": {
                return this.deleteResource<R>(path, payload.id);
            }
            case "UpdateOne": {
                return this.putResource<R>(path, payload);
            }
            case "CreateOne": {
                return this.postResource<R>(path, payload);
            }
        }
    }

    public getResource<R>(path: string, id?: number): Observable<R> {
        let resourceUrl = `${this.apiBasePath}${path}`;
        resourceUrl = id != null ? resourceUrl + `/${id}` : resourceUrl;
        return this.http.get<R>(resourceUrl);
    }

    public deleteResource<R>(path: string, id: number): Observable<R> {
        return this.http.delete<R>(`${this.apiBasePath}${path}/${id}`);
    }

    public putResource<R>(path: string, resource: IPayload): Observable<R> {
        return this.http.put<R>(`${this.apiBasePath}${path}/${resource.id}`, resource);
    }

    public postResource<R>(path: string, resource: IPayload): Observable<R> {
        return this.http.post<R>(`${this.apiBasePath}${path}`, resource);
    }
}
