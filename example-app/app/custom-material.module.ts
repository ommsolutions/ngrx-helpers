import {NgModule} from "@angular/core";
import {MatButtonModule, MatToolbarModule} from "@angular/material";
import {CdkTableModule} from "@angular/cdk/table";

@NgModule({
    imports: [MatButtonModule, MatToolbarModule, CdkTableModule],
    exports: [MatButtonModule, MatToolbarModule, CdkTableModule]
})
export class CustomMaterialModule {
    //
}
