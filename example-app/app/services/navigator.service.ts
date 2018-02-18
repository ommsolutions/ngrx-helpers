import {IState} from "../reducers";
import {Store} from "@ngrx/store";
import * as RouterActions from "../actions/router.actions";
import {Injectable} from "@angular/core";

@Injectable()
export class NavigatorService {

    constructor(private store: Store<IState>) {

    }

    public back() {
        this.store.dispatch(new RouterActions.Back());
    }

    public navigateToConfig() {
        this.store.dispatch(new RouterActions.Go({
            path: ["./config"]
        }));
    }

    // TODO add routes for: lines , machines , search
}
