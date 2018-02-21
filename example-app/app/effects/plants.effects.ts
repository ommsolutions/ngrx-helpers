import {Injectable} from "@angular/core";
import {Action} from "@ngrx/store";
import {Actions, Effect} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import {EffectHelperService} from "@omm/ngrx-helpers";

import {DataService} from "../services";
import {PlantsResource} from "../resources/plants.resource";

@Injectable()
export class PlantsEffects {

    @Effect()
    plants$: Observable<Action> = this.actions$
        .pipe(this.effectHelperService.handle(PlantsResource, "LoadAll"));

    constructor(private actions$: Actions,
                private dataService: DataService,
                private effectHelperService: EffectHelperService) {
    }
}
