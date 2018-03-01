import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

import {IPlant} from "../../resources/plants.resource";

@Component({
    selector: "app-plant-info",
    template: `
        <div class="container">
            <h1>Details for Plant with ID: {{plant.id}}</h1>
            <mat-form-field>
                <input matInput [disabled]="true" placeholder="Country" [value]="plant.country">
            </mat-form-field>
            <mat-form-field>
                <input matInput [disabled]="true" placeholder="City" [value]="plant.city">
            </mat-form-field>
            <mat-form-field>
                <input matInput [disabled]="true" placeholder="ZipCode" [value]="plant.zipCode">
            </mat-form-field>
            <mat-form-field>
                <input matInput [disabled]="true" placeholder="Street" [value]="plant.street">
            </mat-form-field>
            <mat-form-field>
                <input matInput [disabled]="true" placeholder="Description" [value]="plant.description">
            </mat-form-field>
            <button mat-raised-button color="primary" (click)="dismiss()">OK</button>
        </div>
    `,
    styles: [
            `.container {
            display: flex;
            flex-direction: column;
            min-width: 400px;
        }`,
    ]
})
export class PlantInfoComponent {
    public plant: IPlant;

    constructor(public dialogRef: MatDialogRef<PlantInfoComponent>,
                @Inject(MAT_DIALOG_DATA) public data: { plant: IPlant }) {
        this.plant = data.plant;
    }

    dismiss() {
        this.dialogRef.close();
    }

}
