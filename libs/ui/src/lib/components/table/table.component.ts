import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { CdkTableExporter } from 'mat-table-exporter';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'ui-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<T> implements AfterViewInit {
  @Input()
  public headerDefinitions: string[];

  @Input()
  get dataSource(): T[] {
    return this._dataSource;
  }

  set dataSource(value: T[]) {
    this._dataSource = value;
    if (value) {
      const tableData = new MatTableDataSource(value);
      tableData.sort = this.sort;
      tableData.paginator = this.paginator;
      this.tableData = tableData;
      if (value[0] && !this.headerDefinitions) {
        this.headerDefinitions = Object.keys(value[0]);
      }
    }
  }

  @Input()
  loaded = false;

  @ViewChild('exporter')
  public exporter: CdkTableExporter;

  @ViewChild(MatSort)
  public sort: MatSort;

  @ViewChild(MatPaginator)
  public paginator: MatPaginator;

  public tableData: MatTableDataSource<T>;

  private _dataSource: T[];

  ngAfterViewInit() {
    this.tableData.sort = this.sort;
    this.tableData.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableData.filter = filterValue.trim().toLowerCase();
  }

  export(format: 'xlsx' | 'csv' | 'txt' | 'json') {
    this.exporter.exportTable(format, { fileName: 'data' });
  }
}
