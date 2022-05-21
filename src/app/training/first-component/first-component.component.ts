import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-first-component',
  templateUrl: './first-component.component.html',
  styleUrls: ['./first-component.component.scss']
})
export class FirstComponentComponent implements OnInit {
  
  myname: any;
  isshowing: any;
  data: any;

  constructor(private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
      this.myname="EDWARD";
      this.isshowing="N";

      this._activatedRoute.data.subscribe(({ 
        data, menudata, userdata })=> { 
        this.data=data;
      }) 

  }

  showPanel() {
    if (this.isshowing=='Y') {
      this.isshowing='N';
    } else {
      this.isshowing='Y';
    }
  }

}
