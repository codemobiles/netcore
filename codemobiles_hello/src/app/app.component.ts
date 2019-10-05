import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hello';
  version = 1
  isGirl = false;

  isUpgrade(){
    return "yes";
  }
}
