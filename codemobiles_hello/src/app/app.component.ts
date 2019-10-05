import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'hello';
  header = "Angular Communication Demo";
  version = 1
  isGirl = false;
  time:any;

  onClickRun1(){
    alert("555");
  }

  ngOnInit(): void {
   setInterval(()=>{
    this.time = Date.now();
   }, 1000)
  }

  isUpgrade(){
    return "yes";
  }
}
