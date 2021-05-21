import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChartTheme, ChartType } from '../../model/chart';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ui-chart-settings-dialog',
  templateUrl: './chart-settings-dialog.component.html',
  styleUrls: ['./chart-settings-dialog.component.css'],
})
export class ChartSettingsDialogComponent implements OnInit {
  public types: ChartType[] = [
    'line',
    'bar',
    'scatter',
    'pie',
    'effectScatter',
    'radar',
    'tree',
    'treemap',
    'sunburst',
    'boxplot',
    'candlestick',
    'heatmap',
    'map',
    'parallel',
    'lines',
    'graph',
    'sankey',
    'funnel',
    'gauge',
    'pictorialBar',
    'themeRiver',
    'custom',
  ];

  public themes: ChartTheme[] = [
    'bee-inspired',
    'blue',
    'caravan',
    'carp',
    'cool',
    'dark',
    'dark-blue',
    'dark-bold',
    'dark-digerati',
    'dark-fresh-cut',
    'dark-mushroom',
    'eduardo',
    'forest',
    'fresh-cut',
    'fruit',
    'gray',
    'green',
    'helianthus',
    'inspired',
    'jazz',
    'london',
    'macarons',
    'macarons2',
    'mint',
    'red',
    'red-velvet',
    'roma',
    'royal',
    'sakura',
    'shine',
    'tech-blue',
    'vintage',
  ];

  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ChartSettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { theme: ChartTheme; type: ChartType }
  ) {
    this.formGroup = formBuilder.group({
      type: ['line'],
      theme: ['light'],
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.formGroup.patchValue(this.data);
    }
  }
}
