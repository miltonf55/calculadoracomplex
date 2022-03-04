import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnChanges {
  @Input() z1s:number[]=[];
  @Input() z2s:number[]=[];
  @Input() suma:number[]=[];
  @Input() multi:number[]=[];
  @Input() div:number[]=[];
  @Input() pow:number[]=[];
  @Input() root:any[]=[];
  @Input() exp:number[]=[];
  @Input() sin:number[]=[];
  @Input() cos:number[]=[];
  @Input() tan:number[]=[];
  

  // Array of different segments in chart
  lineChartData: ChartDataset[] = [
    { 
      data: [{x: this.z1s[0], y: this.z1s[1]}], 
      label: 'Z₁',
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointRadius: 10,
      fill: 'origin'
    },
    { 
      data: [{x: this.z2s[0], y: this.z2s[1]}], 
      label: 'Z₂',
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointRadius: 10
    },
    { 
      data: [{x: this.suma[0], y: this.suma[1]}], 
      label: 'Suma',
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointRadius: 10
    },
    { 
      data: [{x: this.multi[0], y: this.multi[0]}], 
      label: 'Multiplicación',
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointRadius: 10
    },
    { 
      data: [{x: this.div[0], y: this.div[1]}], 
      label: 'División',
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointRadius: 10
    },
    { 
      data: [{x: this.pow[0], y: this.pow[1]}], 
      label: 'Potencia',
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointRadius: 10
    },
    { 
      data: [{x: 0, y: 0}], 
      label: 'Raíz',
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointRadius: 10
    },
    { 
      data: [{x: this.exp[0], y: this.exp[1]}], 
      label: 'Exponencial',
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointRadius: 10
    },
    { 
      data: [{x: this.sin[0], y: this.sin[1]}], 
      label: 'Seno',
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointRadius: 10
    },
    { 
      data: [{x: this.cos[0], y: this.cos[1]}], 
      label: 'Coseno',
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointRadius: 10
    },
    { 
      data: [{x: this.tan[0], y: this.tan[1]}], 
      label: 'Tangente',
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointRadius: 10
    }
  ];


  // Define chart options
  lineChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true }
    },
    scales: {
      x: {
        beginAtZero: true,
        suggestedMax: 30,
        suggestedMin: -30,
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
        suggestedMax: 30,
        suggestedMin: -30,
        grid: {
          borderColor: 'red'
        },
        position: 'center',
        title: {
          display: true,
          text: 'Im',
          align: 'center',
          color: 'red',
          padding: 0
        }
      }
    }
  };

  // Set true to show legends
  lineChartLegend = true;

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.lineChartData[0].data=[{x: this.z1s[0], y: this.z1s[1]}];
      this.lineChartData[1].data=[{x: this.z2s[0], y: this.z2s[1]}]
      this.lineChartData[2].data=[{x: this.suma[0], y: this.suma[1]}];
      this.lineChartData[3].data=[{x: this.multi[0], y: this.multi[1]}];
      this.lineChartData[4].data=[{x: this.div[0], y: this.div[1]}];
      this.lineChartData[5].data=[{x: this.pow[0], y: this.pow[1]}];
      for(let item of this.root) {this.lineChartData[6].data.push({x: item[0], y: item[1]});}
      this.lineChartData[7].data=[{x: this.exp[0], y: this.exp[1]}];
      this.lineChartData[8].data=[{x: this.sin[0], y: this.sin[1]}];
      this.lineChartData[9].data=[{x: this.cos[0], y: this.cos[1]}];
      this.lineChartData[10].data=[{x: this.tan[0], y: this.tan[1]}];
      this.chart?.update();
      console.log(this.z1s);
    }
  }

}
