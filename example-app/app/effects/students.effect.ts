import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import {Action} from "@ngrx/store";
import {DataService} from "../services/data.service";
import {StudentsAction} from "../actions/students.action";
import {EffectHelperService} from "../../../src";

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
