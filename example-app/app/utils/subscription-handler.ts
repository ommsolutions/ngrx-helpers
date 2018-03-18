import {OnDestroy} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {takeUntil} from "rxjs/operators";

/**
 * Extend this class if you want to enable manually completion of observable streams
 * as soon as the component is destroyed.
 * This should not be necessary in most cases (e.g. when using take(1) or | async.
 */
export class SubscriptionHandler implements OnDestroy {

    public destroy$: Subject<void> = new Subject<void>();

    public takeUntilDestroy<T>() {
        return takeUntil(this.destroy$);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }
}
