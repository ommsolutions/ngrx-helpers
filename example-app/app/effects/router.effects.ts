// Implementation inspired by: https://github.com/ngrx/platform/blob/master/docs/router-store/api.md#custom-router-state-serializer
import {Injectable} from "@angular/core";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {map, tap} from "rxjs/operators";

import {RouterActionTypes, Go} from "../actions/router.actions";

@Injectable()
export class RouterEffects {

    @Effect({dispatch: false})
    navigate$ = this.actions$.pipe(
        ofType(RouterActionTypes.GO),
        map((action: Go) => action.payload),
        tap(({path, query: queryParams, extras}) => this.router.navigate(path, {queryParams, ...extras}))
    );

    @Effect({dispatch: false})
    navigateBack$ = this.actions$.pipe(
        ofType(RouterActionTypes.BACK),
        tap(() => this.location.back())
    );

    constructor(private actions$: Actions,
                private router: Router,
                private location: Location) {
    }
}
