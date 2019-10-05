import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bkk2',
  templateUrl: './bkk2.component.html',
  styleUrls: ['./bkk2.component.css']
})
export class Bkk2Component implements OnInit {

  constructor() { }

  @Input("counter") count:number;

  ngOnInit() {
  }

}
