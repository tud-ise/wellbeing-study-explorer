import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { ChartComponent } from './components/chart/chart.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import 'echarts/theme/dark-mushroom';
import 'echarts/theme/dark-fresh-cut';
import 'echarts/theme/red-velvet';
import 'echarts/theme/cool';
import 'echarts/theme/dark-blue';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableExporterModule,
    MatTooltipModule,
    NgxEchartsModule.forRoot({ echarts }),
  ],
  declarations: [TableComponent, ChartComponent],
  exports: [TableComponent, ChartComponent],
})
export class UiModule {}
