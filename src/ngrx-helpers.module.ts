import {ModuleWithProviders, NgModule} from "@angular/core";
import {RestHelperService, StoreHelperService} from "./services";
import {EffectHelperService} from "./effects";

@NgModule({
    providers: [StoreHelperService, EffectHelperService, RestHelperService]
})
export class NgrxHelpersRootModule {
}

@NgModule({})
export class NgrxHelpersModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: NgrxHelpersRootModule,
        };
    }
}
