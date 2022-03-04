import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-complex',
  templateUrl: './complex.component.html',
  styleUrls: ['./complex.component.css']
})
export class ComplexComponent implements OnInit {

  dataok:boolean = false;
  z1:string='';
  z2:string='';
  n:number=0;
  m:number=0;
  suma:number[]=[0,0];
  multi:number[]=[0,0];
  div:number[]=[0,0];
  pow:number[]=[0,0];
  root:any[]=[];
  exp:number[]=[0,0];
  sin:number[]=[0,0];
  cos:number[]=[0,0];
  tan:number[]=[0,0];
  public chart: any = null;

  

  constructor() {}

  ngOnInit(): void {
    this.chart = new Chart('grafica',
    {
      type: 'bar',
      data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });

  }
  calcular(){
    var z1s:number[];
    var z2s:number[];
    var zP1:number[];
    var zP2:number[];
    var bRoot = new Array<any>();
    z1s=this.separateRI(this.z1)
    z2s=this.separateRI(this.z2)
    this.suma=this.sumaC(z1s,z2s);
    this.multi=this.multiC(z1s,z2s);
    this.div=this.divC(z1s,z2s);
    zP1=this.toPolar(z1s);
    zP2=this.toPolar(z2s);
    this.pow=this.toBinomic(this.powC(zP1));
    for (let i = 1; i < this.m+1; i++) {
      let temp=this.toBinomic([this.rootC(zP2)[0],this.rootC(zP2)[i]]);
      bRoot.push([temp[0], temp[1]]);
    }
    this.root=bRoot;
    this.exp=this.expC(z1s);
    this.sin=this.sinC(z1s);
    this.cos=this.cosC(z2s);
    this.tan=this.tanC(this.sumaC(z1s, z2s));
    this.dataok=true;
  }

  sumaC(z1:number[], z2:number[]):number[]{
    var suma:number[]=[0,0];
    suma[0]=z1[0]+z2[0];
    suma[1]=z1[1]+z2[1];
    return suma;
  }
  divC(z1:number[], z2:number[]):number[]{
    var div:number[]=[0,0];
    let temp;
    div[0]=(z1[0]*z2[0])+(z1[1]*z2[1]);
    div[1]=(z1[1]*z2[0])-(z1[0]*z2[1]);
    temp=(Math.pow(z2[0],2))+(Math.pow(z2[1],2));
    div[0]/=temp;
    div[1]/=temp;
    return div;
  }
  multiC(z1:number[], z2:number[]):number[]{
    var multi:number[]=[0,0];
    multi[0]=(z1[0]*z2[0])+(z1[1]*z2[1]*(-1));
    multi[1]=(z1[0]*z2[1])+(z1[1]*z2[0]);
    return multi;
  }

  powC(z:number[]):number[]{
    var zPow:number[]=[0,0];
    zPow[0]=Math.pow(z[0], this.n);
    zPow[1]=this.n*z[1];
    return zPow;
  }

  rootC(z:number[]):number[]{
    var zRoot = new Array<number>();
    zRoot.push(Math.pow(z[0], 1/this.m));
    for (let i = 1; i < this.m+1; i++) {
      zRoot.push((z[1]+(360*(i-1)))/this.m);
    }
    return zRoot;
  }

  expC(z:number[]):number[]{
    var expZ:number[]=[0,0];
    expZ[0]=Math.exp(z[0])*Math.cos(z[1]);
    expZ[1]=Math.exp(z[0])*Math.sin(z[1]);
    return expZ;
  }
  sinC(z:number[]):number[]{
    var sin:number[]=[0,0];
    let temp1:number[]=this.multiC(z, [0,1]);
    let temp2:number[]=this.multiC(z, [0,-1]);
    let temp3:number[]=this.sumaC(this.expC(temp1), [(this.expC(temp2)[0]*-1), (this.expC(temp2)[1]*-1)]);
    sin=this.divC(temp3, [0, 2]);
    return sin;
  }
  cosC(z:number[]):number[]{
    var cos:number[]=[0,0];
    let temp1:number[]=this.multiC(z, [0,1]);
    let temp2:number[]=this.multiC(z, [0,-1]);
    let temp3:number[]=this.sumaC(this.expC(temp1), this.expC(temp2));
    cos=this.divC(temp3, [2, 0]);
    return cos;
  }
  tanC(z:number[]):number[]{
    var tan:number[]=[0,0];
    tan=this.divC(this.sinC(z), this.cosC(z));
    return tan;
  }

  separateRI(z:string):number[]{
    var part:number[]=[0,0];
    let temp=0;
    for (let index = 0; index < z.length; index++) {
      if (z.charAt(index)=='+'||z.charAt(index)=='-' ) {
        part[0]= +z.substring(0,index);
        temp=index;
      }
      else{
        if (z.charAt(index)=='i') {
          if (z.charAt(temp)=='+') part[1]= +z.substring(temp+1,index);
          else part[1]= +z.substring(temp,index);
          if (z.charAt(temp)=='i' || z.charAt(temp+1)=='i') {
            if (z.charAt(temp+1)=='i' && z.charAt(temp)=='-') part[1]=(-1);
            else part[1]=1;
          }
        }
      }
    }
    if (part[0]==0 && part[1]!=1 && z.charAt(0)!='+' && z.charAt(0)!='-') {
      part[0]= +z;
    }
    
    return part;
  }
  toPolar(z:number[]):number[]{
    var polar:number[]=[0,0]
    polar[0]=Math.sqrt(Math.pow(z[0],2)+Math.pow(z[1],2));
    polar[1]=(Math.atan(z[1]/z[0]))*(180/Math.PI);
    return polar;
  }
  toBinomic(zP:number[]):number[]{
    var z:number[]=[0,0]
    z[1]=zP[0]*(Math.sin(zP[1]*(Math.PI/180)));
    z[0]=zP[0]*(Math.cos(zP[1]*(Math.PI/180)));;
    return z;
  }

}
