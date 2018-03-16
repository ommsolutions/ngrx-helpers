import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {DispatchService} from "@omm/ngrx-helpers";

import {IMachine, MachinesResource} from "../../resources/machines.resource";

@Component({
    selector: "app-add-machine",
    template:
            `
        <div class="container">
            <h1>Adding Machine for Plant with ID: {{parent}}</h1>
            <form #form="ngForm" (ngSubmit)="save(form.value)" class="form">
                <mat-form-field>
                    <input matInput name="ip" placeholder="IP" required [ngModel]="newMachine.ip">
                </mat-form-field>
                <mat-form-field>
                    <input matInput name="price" placeholder="Price" required [ngModel]="newMachine.price">
                </mat-form-field>
                <mat-form-field>
                    <input matInput name="mac" placeholder="MAC" required [ngModel]="newMachine.mac">
                </mat-form-field>
                <mat-form-field>
                    <input matInput name="lastFailure" placeholder="Last Failure" required [ngModel]="newMachine.lastFailure">
                </mat-form-field>
                <div class="buttons">
                    <button type="button" mat-button (click)="dismiss()">Cancel</button>
                    <button type="submit" mat-raised-button color="primary" [disabled]="!isValid(form.value)">Save</button>
                </div>
            </form>
        </div>
    `,
    styles: [
            `.container {
            display: flex;
            flex-direction: column;
            min-width: 400px;
        }`, `.buttons {
            width: 100%;
            display: flex;
            justify-content: center;
        }`, `button {
            margin: 10px;
        }`, `.form {
            display: flex;
            flex-direction: column;
        }`]
})
export class AddMachineComponent {
    public parent: number;
    public newMachine: IMachine = {};

    constructor(public dialogRef: MatDialogRef<AddMachineComponent>,
                private dispatchService: DispatchService,
                @Inject(MAT_DIALOG_DATA) public data: { parent: number }) {
        this.parent = data.parent;
    }

    dismiss() {
        this.dialogRef.close();
    }

    save(value) {
        const result = {...{plantId: this.parent}, ...value};
        this.dispatchService.dispatch(MachinesResource, "CreateOne", result);
    }

    isValid(value) {
        return value.ip != null && value.price != null && value.mac != null && value.lastFailure != null;
    }

}
