import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartSettingsDialogComponent } from '../../dialogs/chart-settings-dialog/chart-settings-dialog.component';
import { ChartSeries, ChartTheme } from '../../model/chart';
import set = Reflect.set;

@Component({
  selector: 'ui-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnChanges {
  @Input()
  public chartId = 'chart';

  @Input()
  public series: ChartSeries[];

  @Input()
  public xAxis: string[] = [];

  @Input()
  public darkMode = false;

  @Input()
  public yAxisLabel = '';

  @Input()
  public yAxisMinValue = 0;

  @Input()
  public yAxisMaxValue = undefined;

  @Input()
  public theme: ChartTheme;

  @Input()
  public darkTheme: string;

  @Input()
  public height: string;

  @Output()
  public onClick: EventEmitter<{
    xValue: any;
    yValue: any;
    seriesName: string;
  }> = new EventEmitter();

  options: any;

  constructor(private dialog: MatDialog, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.setOptions();
  }

  ngOnChanges() {
    this.setOptions();
  }

  onChartEvent(event: any) {
    this.onClick.emit({
      xValue: event.name,
      yValue: event.data,
      seriesName: event.seriesName,
    });
  }

  private setOptions() {
    this.options = {
      legend: {
        data: this.series.map((item) => item.name),
        align: 'left',
      },
      xAxis: {
        type: 'category',
        data: this.xAxis,
        silent: false,
        splitLine: {
          show: false,
        },
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          interval: 0,
          rotate: 30, //If the label names are too long you can manage this by rotating the label.
        },
      },
      yAxis: {
        type: 'value',
        min: this.yAxisMinValue,
        max: this.yAxisMaxValue,
        name: this.yAxisLabel,
      },
      series: this.series,
      animationEasing: 'elasticOut',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
    };
  }

  openSettings() {
    const config = {
      theme: this.darkMode ? this.darkTheme : this.theme,
      type: this.series[0].type,
    };
    this.dialog
      .open(ChartSettingsDialogComponent, { data: config })
      .afterClosed()
      .subscribe((settings) => {
        if (settings) {
          if (this.darkMode) {
            this.darkTheme = settings.theme;
          } else {
            this.theme = settings.theme;
          }
          this.series.forEach((item) => (item.type = settings.type));
          this.setOptions();
          this.cdr.detectChanges();
        }
      });
  }
}
