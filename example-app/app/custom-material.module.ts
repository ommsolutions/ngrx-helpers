import {NgModule} from "@angular/core";
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatToolbarModule} from "@angular/material";
import {CdkTableModule} from "@angular/cdk/table";

@NgModule({
    imports: [MatButtonModule, MatToolbarModule, CdkTableModule, MatSnackBarModule, MatFormFieldModule, MatInputModule],
    exports: [MatButtonModule, MatToolbarModule, CdkTableModule, MatSnackBarModule, MatFormFieldModule, MatInputModule]
})
export class CustomMaterialModule {
    //
}
