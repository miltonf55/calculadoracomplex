import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-circunferencia',
  templateUrl: './circunferencia.component.html',
  styleUrls: ['./circunferencia.component.css']
})
export class CircunferenciaComponent implements OnInit {
  dataok:boolean = false;
  a:string='';
  b:string='';
  d:string='';
  p:string='';
  c:string='';
  as:number[]=[0,0];
  bs:number[]=[0,0];
  ds:number[]=[0,0];
  ps:number[]=[0,0];
  cs:number[]=[0,0,0];
  p1:number[]=[0,0];
  p2:number[]=[0,0];
  p3:number[]=[0,0];
  ci:number[]=[0,0,0];

  constructor() { }

  ngOnInit(): void {
  }

  calcular(){
    this.as=this.separateRI(this.a);
    this.bs=this.separateRI(this.b);
    this.ds=this.separateRI(this.d);
    this.ps=this.separateRI(this.p);
    this.cs=this.separateC(this.c);
    var t=[];
    t[0]=this.cs[0];
    t[1]=this.cs[1]+this.cs[2];
    this.p1=this.obtenerP(t);
    t[0]=this.cs[0];
    t[1]=this.cs[1]-this.cs[2];
    this.p2=this.obtenerP(t);
    t[0]=this.cs[0]+this.cs[2];
    t[1]=this.cs[1];
    this.p3=this.obtenerP(t);
    this.ci=this.circun3();
    this.dataok=true;
  }

  circun3():number[]{
    var circ=[0,0,0]
    var a=[]
    a[1]=[0, 0, 0, 0]; a[2]=[0, 0, 0, 0]; a[3]=[0, 0, 0, 0];
    var b=[];
    b[1]=[0, 0, 0, 0]; b[2]=[0, 0, 0, 0]; b[3]=[0, 0, 0, 0];
    var c=[];
    c[1]=[0, 0, 0, 0]; c[2]=[0, 0, 0, 0]; c[3]=[0, 0, 0, 0];
    
    a[1][1]=this.p1[0];
    a[1][2]=this.p1[1];
    a[1][3]=1;
    a[1][4]=(Math.pow(this.p1[0], 2)+Math.pow(this.p1[1], 2))*-1;
    
    a[2][1]=this.p2[0];
    a[2][2]=this.p2[1];
    a[2][3]=1;
    a[2][4]=(Math.pow(this.p2[0], 2)+Math.pow(this.p2[1], 2))*-1;
    
    a[3][1]=this.p3[0];
    a[3][2]=this.p3[1];
    a[3][3]=1;
    a[3][4]=(Math.pow(this.p3[0], 2)+Math.pow(this.p3[1], 2))*-1;

    for(let j=1;j<=4;j++){
      b[1][j]=a[1][j];
      b[2][j]=a[1][1]*a[2][j]-a[2][1]*a[1][j] ;
      b[3][j]=a[1][1]*a[3][j]-a[3][1]*a[1][j] ;
      c[1][j]=b[1][j];
      c[2][j]=b[2][j];
      c[3][j]=b[2][2]*b[3][j]-b[3][2]*b[2][j]; 
    }
    var temp=[]
    temp[0]=c[3][4]/c[3][3];
    temp[1]=(c[2][4]-circ[0]*c[2][3])/c[2][2];
    temp[2]=(c[1][4]-circ[1]*c[1][2]-circ[0]*c[1][3])/c[1][1];

    circ[0]=temp[2]/(-2);
    circ[1]=temp[1]/(-2);
    circ[2]=Math.pow(circ[0], 2)+Math.pow(circ[1], 2)-temp[0];
    circ[2]=Math.sqrt(circ[2]);

    console.log(circ);
    return circ;
  }

  obtenerP(z:number[]):number[]{
    let temp=[];
    var p=[0,0];
    temp[0]=this.multiC(z, this.as);
    temp[1]=this.sumaC(temp[0], this.bs);
    temp[2]=this.multiC(z, this.ds);
    temp[3]=this.sumaC(temp[2], this.ps);
    p=this.divC(temp[1], temp[3]);
    console.log(p);
    return p;
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

  separateC(z:string):number[]{
    var part:number[]=[0,0,0];
    var it:number[]=[0,0,0,0];
    for (let index = 1; index < z.length; index++) {
      if (z.charAt(index)==")" && it[1]==0) {
        it[0]=index;
      }
      if (z.charAt(index)==")" && it[1]!=0) {
        it[2]=index;
      }
      if (z.charAt(index)=="(") {
        it[1]=index;
      }
      if (z.charAt(index)=="=") {
        it[3]=index;
      }
    }
    if(it[0]==0 || it[1]==0){
      part=this.separateCL(z);
      part[0]=part[0]/(-2);
      part[1]=part[1]/(-2);
      part[2]=Math.pow(part[0], 2)+Math.pow(part[1], 2)-part[2];
      part[2]=Math.sqrt(part[2]);
    }else{
      part[0]=this.masmenos(z.substring(0, it[0]));
      part[1]=this.masmenos(z.substring(it[1], it[2]));
      part[2]= +z.substring(it[3]+1, z.length);
      part[2]=Math.sqrt(part[2]);
    }
    console.log(part);
    return part;
  }
  separateCL(z:string):number[]{
    var part:number[]=[0,0,0];
    var it:number[]=[0,0,0,0,0];
    for (let index = 1; index < z.length; index++) {
      if (z.charAt(index)=="x" && it[0]==0) {
        it[0]=index;
      }
      if (z.charAt(index)=="x" && it[0]!=0) {
        it[1]=index;
      }
      if (z.charAt(index)=="y" && it[2]==0) {
        it[2]=index;
      }
      if (z.charAt(index)=="y" && it[2]!=0) {
        it[3]=index;
      }
      if (z.charAt(index)=="=") {
        it[4]=index;
      }
    }
    if (z.charAt(it[1]-1)=='+' || z.charAt(it[1]-1)=='-') {
      part[0]=1;
      if(z.charAt(it[1]-1)=='-') part[0]=-1;
    }else{
      part[0]= +z.substring(7, it[1]);
    }
    if (z.charAt(it[3]-1)=='+' || z.charAt(it[3]-1)=='-') {
      part[1]=1;
      if(z.charAt(it[3]-1)=='-') part[1]=-1;
    }else{
      part[1]= +z.substring(it[1]+1, it[3]);
    }
    part[2]= +z.substring(it[3]+1, it[4]);
    return part;
  }
  masmenos(z:string): number{
    var num:number=0;
    let temp:number=0;
    for (let index = 0; index < z.length; index++) {
      if (z.charAt(index)=='+'||z.charAt(index)=='-' ) {
        temp=index;
      }
    }
    if (z.charAt(temp)=="+") {
      num= +z.substring(temp+1, z.length);
    }
    else{
      num= +z.substring(temp, z.length);
    }
    num*=-1;
    return num;
  }

}
