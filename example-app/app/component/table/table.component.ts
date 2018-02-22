import {ChangeDetectionStrategy, Component, Input} from "@angular/core";

/**
 * Defines a table which can be displayed by the table component.
 */
export interface ITableDefinition {
    columns: IColumnDefinition[];
}

/**
 * Defines a column of a table.
 */
export interface IColumnDefinition {
    /** Identifies the column (must be unique!) and gives the header name. */
    name: string;
    /** Indicates if the column is hidden. */
    hidden: boolean;
    /** Specifies if the column contains text or some buttons. */
    type?: "action" | "text";
    /** Defines the actions which should be available in the column. */
    actions?: ITableAction[];
}

/**
 * Defines the actions which are available in a column of type "action".
 */
export interface ITableAction {
    /** The icon (key of the material icon set) which will be the button. */
    icon: string;
    /** The function that shall be executed when clicking the button. */
    fn: Function;
}

@Component({
    selector: "app-table",
    templateUrl: "table.component.html",
    styleUrls: ["table.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {

    @Input() tableDefinition: ITableDefinition;
    @Input() tableData: { [key: string]: any }[];

    get visibleColumns(): string[] {
        return this.tableDefinition.columns
            .filter((col: IColumnDefinition) => !col.hidden)
            .map((col: IColumnDefinition) => col.name);
    }

}
