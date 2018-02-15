import {Injectable} from "@angular/core";
import {Action} from "@ngrx/store";
import {Actions, Effect} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import {EffectHelperService} from "ngrx-helpers";

import {DataService} from "../services";
import {StudentsAction} from "../actions/students.action";

@Injectable()
export class StudentsEffect {

    @Effect()
    students$: Observable<Action> = this.actions$
        .pipe(this.effectHelperService.handle(StudentsAction, "LoadAll"));

    constructor(private actions$: Actions,
                private dataService: DataService,
                private effectHelperService: EffectHelperService) {
    }
}
