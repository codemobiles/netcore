import { Component } from '@angular/core';
import { NetworkServiceService } from './services/network-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cmPOS';

  constructor(private networkService: NetworkServiceService){

  }

 public get isLogged() : Boolean {
   return this.networkService.isLogin();
 }

}
