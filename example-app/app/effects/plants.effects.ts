import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {EffectHelperService} from "@omm/ngrx-helpers";

import {PlantsResource} from "../resources/plants.resource";

@Injectable()
export class PlantsEffects {

    @Effect()
    plants$ = this.effectHelperService.handle(this.actions$, PlantsResource, ["LoadAll"]);

    constructor(private actions$: Actions,
                private effectHelperService: EffectHelperService) {
    }
}
