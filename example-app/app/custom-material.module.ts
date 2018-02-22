import {NgModule} from "@angular/core";
import {MatButtonModule, MatSnackBarModule, MatToolbarModule} from "@angular/material";
import {CdkTableModule} from "@angular/cdk/table";

@NgModule({
    imports: [MatButtonModule, MatToolbarModule, CdkTableModule, MatSnackBarModule],
    exports: [MatButtonModule, MatToolbarModule, CdkTableModule, MatSnackBarModule]
})
export class CustomMaterialModule {
    //
}
