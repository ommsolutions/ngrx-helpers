import {NgModule} from "@angular/core";
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatToolbarModule} from "@angular/material";
import {CdkTableModule} from "@angular/cdk/table";

const MODULES = [
    MatButtonModule,
    MatToolbarModule,
    CdkTableModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
];

@NgModule({
    imports: [...MODULES],
    exports: [...MODULES]
})
export class CustomMaterialModule {
    //
}
