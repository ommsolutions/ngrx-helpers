import {Params, RouterStateSnapshot} from "@angular/router";
import {RouterStateSerializer} from "@ngrx/router-store";
import {routerReducer} from "@ngrx/router-store";

export interface RouterStateUrl {
    url: string;
    params: Params;
    queryParams: Params;
}

export class CustomRouterSerializer implements RouterStateSerializer<RouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        let route = routerState.root;

        while (route.firstChild) {
            route = route.firstChild;
        }

        // See: https://github.com/ngrx/platform/blob/master/docs/router-store/api.md#custom-router-state-serializer
        // Only return an object including the URL, params and query params
        // instead of the entire snapshot
        // This way we can continue to use storeFreeze during development
        const {url, root: {queryParams}} = routerState;
        const {params} = route;
        return {url, params, queryParams};
    }
}

export const reducer = routerReducer;

