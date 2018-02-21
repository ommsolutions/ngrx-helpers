import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";

export interface ITableDefinition {
    columns: IColumnDefinition[];
}

export interface IColumnDefinition {
    name: string;
    hidden: boolean;
    type?: "action" | "text";
    actions?: ITableAction[];
}

export interface ITableAction {
    icon: string;
    fn: Function;
}

@Component({
    selector: "app-table",
    templateUrl: "table.component.html",
    styleUrls: ["table.component.scss"]
})
export class TableComponent implements OnChanges {

    @Input() tableDefinition: ITableDefinition;
    @Input() tableData: {[key: string]: any}[];

    ngOnChanges(changes: SimpleChanges) {
        console.log("New Input Data", changes);
    }

    get visibleColumns(): string[] {
        return this.tableDefinition.columns
            .filter((col: IColumnDefinition) => !col.hidden)
            .map((col: IColumnDefinition) => col.name);
    }

}
