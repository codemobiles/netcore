import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bkk1',
  templateUrl: './bkk1.component.html',
  styleUrls: ['./bkk1.component.css']
})
export class Bkk1Component implements OnInit {

  @Input()  count:number

  constructor() { }

  ngOnInit() {
  }

}
