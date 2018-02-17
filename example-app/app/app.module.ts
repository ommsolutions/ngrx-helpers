import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";
import {NgrxHelpersModule} from "ngrx-helpers";

import {environment} from "../environments/environment";
import {AppComponent} from "./app.component";
import {metaReducers, reducers} from "./reducers";
import {StudentsEffect} from "./effects/students.effect";
import {DataService} from "./services";


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        StoreModule.forRoot(reducers, {metaReducers}),
        StoreDevtoolsModule.instrument({
            name: "ngrx-helpers-example-app",
            logOnly: environment.production
        }),
        EffectsModule.forRoot([StudentsEffect]),
        NgrxHelpersModule.forRoot({apiBasePath: "http://localhost:3000"})
    ],
    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
