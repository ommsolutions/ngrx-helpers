// See here for implementation: https://github.com/ngrx/platform/blob/master/docs/router-store/api.md#custom-router-state-serializer
import {Injectable} from "@angular/core";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {map, tap} from "rxjs/operators";

import * as RouterActions from "../actions/router.actions";

@Injectable()
export class RouterEffects {
    @Effect({ dispatch: false })
    navigate$ = this.actions$.pipe(
        ofType(RouterActions.GO),
        map((action: RouterActions.Go) => action.payload),
        tap(({ path, query: queryParams, extras}) => this.router.navigate(path, { queryParams, ...extras }))
    );

    @Effect({ dispatch: false })
    navigateBack$ = this.actions$.pipe(
        ofType(RouterActions.BACK),
        tap(() => this.location.back())
    );

    constructor(
        private actions$: Actions,
        private router: Router,
        private location: Location
    ) {}
}
