import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bkk1',
  templateUrl: './bkk1.component.html',
  styleUrls: ['./bkk1.component.css']
})
export class Bkk1Component implements OnInit {

  @Input()  count:number
  @Output() change1 = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    setTimeout(()=>{
      this.change1.emit("I love dog");
    }, 5000)
  }

}
