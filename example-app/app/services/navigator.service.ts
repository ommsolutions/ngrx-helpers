import {IState} from "../reducers";
import {Store} from "@ngrx/store";
import * as RouterActions from "../actions/router.actions";
import {Injectable} from "@angular/core";

/**
 * Wraps creation of RouterActions for commonly used routes.
 */
@Injectable()
export class NavigatorService {

    constructor(private store: Store<IState>) {

    }

    /**
     * Go to previous route.
     */
    public back() {
        this.store.dispatch(new RouterActions.Back());
    }

    /**
     * Go to config route (/config).
     */
    public navigateToConfig() {
        this.store.dispatch(new RouterActions.Go({
            path: ["./config"]
        }));
    }

    /**
     * Navigate to "/plants".
     */
    public navigateToPlants() {
        const path = [`./plants`];
        this.store.dispatch(new RouterActions.Go({path}));
    }

    /**
     * Navigates to the machines page, showing only the machines of the specified plant: "plants/<id>/machines".
     * @param {number} id The plant's id to select the machines by.
     */
    public navigateToPlant(id: number) {
        const path = [`./plants/${id}/machines`];
        this.store.dispatch(new RouterActions.Go({path}));
    }
}
