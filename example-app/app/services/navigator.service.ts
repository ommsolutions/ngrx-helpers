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
        const action = new RouterActions.Back();
        this.store.dispatch(action);
    }

    /**
     * Go to config route (/config).
     */
    public navigateToConfig() {
        const action = new RouterActions.Go({
            path: ["./config"]
        });
        this.store.dispatch(action);
    }

    /**
     * Navigate to "/plants".
     */
    public navigateToPlants() {
        const path = [`./plants`];
        const action = new RouterActions.Go({path});
        this.store.dispatch(action);
    }

    /**
     * Navigates to the machines page, showing only the machines of the specified plant: "plants/<id>/machines".
     * @param {number} id The plant's id to select the machines by.
     */
    public navigateToPlant(id: number) {
        const path = [`./plants/${id}/machines`];
        const action = new RouterActions.Go({path});
        this.store.dispatch(action);
    }

    public navigateToMachine(id: number) {
        const path = [`./machines/${id}`];
        const action = new RouterActions.Go({path});
        this.store.dispatch(action);
    }

    public navigateToMachines() {
        const path = [`./machines`];
        const action = new RouterActions.Go({path});
        this.store.dispatch(action);
    }
}
