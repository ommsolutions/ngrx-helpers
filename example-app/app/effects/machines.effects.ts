import {Actions, Effect} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import {EffectHelperService} from "@omm/ngrx-helpers";
import {DataService} from "../services";
import {Action} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {MachinesResource} from "../actions/machines.resource";

@Injectable()
export class MachinesEffects {

    @Effect()
    plants$: Observable<Action> = this.actions$
        .pipe(this.effectHelperService.handle(MachinesResource, "LoadAll"));

    constructor(private actions$: Actions,
                private dataService: DataService,
                private effectHelperService: EffectHelperService) {
    }
}
