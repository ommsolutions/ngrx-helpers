import {ModuleWithProviders, NgModule} from "@angular/core";
import {RestHelperService, DispatchService} from "./services";
import {EffectHelperService} from "./effects";
import {ROOT_MODULE_CONFIG} from "./tokens";

export interface INgrxHelpersModuleOptions {
    apiBasePath?: string;
}

export const DEFAULT_CONFIG: INgrxHelpersModuleOptions = {};

@NgModule({})
export class NgrxHelpersModule {
    static forRoot(options?: INgrxHelpersModuleOptions): ModuleWithProviders {
        return {
            ngModule: NgrxHelpersModule,
            providers: [
                DispatchService,
                EffectHelperService,
                RestHelperService,
                {
                    provide: ROOT_MODULE_CONFIG,
                    useValue: {...options, ...DEFAULT_CONFIG},
                    multi: false
                }
            ]
        };
    }
}
