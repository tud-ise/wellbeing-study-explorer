import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'ui-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
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

  @Output()
  public onClick: EventEmitter<{
    xValue: any;
    yValue: any;
    seriesName: string;
  }> = new EventEmitter();

  options: any;

  constructor() {}

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
      yAxis: {},
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
}

export type ChartSeries = { name: string; type: ChartType; data: any[] };
export type ChartType =
  | 'line'
  | 'bar'
  | 'pie'
  | 'scatter'
  | 'effectScatter'
  | 'radar'
  | 'tree'
  | 'treemap'
  | 'sunburst'
  | 'boxplot'
  | 'candlestick'
  | 'heatmap'
  | 'map'
  | 'parallel'
  | 'lines'
  | 'graph'
  | 'sankey'
  | 'funnel'
  | 'gauge'
  | 'pictorialBar'
  | 'themeRiver'
  | 'custom';
