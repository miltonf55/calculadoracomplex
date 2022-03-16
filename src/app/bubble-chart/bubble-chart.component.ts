import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.css']
})
export class BubbleChartComponent implements OnChanges {
  @Input() cs:number[]=[0,0,0];
  @Input() ci:number[]=[0,0,0];


  bubbleChartOptions: ChartConfiguration['options'] = {
    scales: {
      x: {
        beginAtZero: true,
        suggestedMax: 0.5,
        suggestedMin: -0.5,
        ticks: {},
        grid: {
          borderColor: 'red'
        },
        position: 'center',
        title: {
          display: true,
          text: 'Re',
          align: 'center',
          color: 'red',
          padding: 8
        }
      },
      y: {
        beginAtZero: true,
        suggestedMax: 0.5,
        suggestedMin: -0.5,
        ticks: {},
        grid: {
          borderColor: 'red'
        },
        position: 'center',
        title: {
          display: true,
          text: 'Im',
          align: 'center',
          color: 'red',
          padding: 8
        }
      },
    }
  };

  bubbleChartData: ChartData<'bubble'> = {
    labels: [],
    datasets: [ 
      {
      data: [
        { x: this.cs[0], y: this.cs[1], r: this.cs[2] }
      ],
      label: 'Circunferencia original',
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      hoverBackgroundColor: 'rgba(0, 255, 0, 0.3)',
      hoverBorderColor: 'green',
    },
    {
      data: [
        { x: this.ci[0], y: this.ci[1], r: this.ci[2] }
      ],
      label: 'Circunferencia invertida',
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      hoverBackgroundColor: 'purple',
      hoverBorderColor: 'red',
    } 
  ]
  };

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.bubbleChartData.datasets[0].data=[{ x: this.cs[0], y: this.cs[1], r: this.cs[2] }];
      this.bubbleChartData.datasets[1].data=[{ x: this.ci[0], y: this.ci[1], r: this.ci[2] }];
      this.chart?.update();
      console.log('hola '+this.ci);
      console.log(this.cs);
    }
  }


}
