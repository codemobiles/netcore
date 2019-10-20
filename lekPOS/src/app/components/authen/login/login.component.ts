import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkServiceService } from 'src/app/services/network-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,
     private networkService: NetworkServiceService) { }

  ngOnInit() {
  }

  onSubmit(value){
    this.networkService.login(value).subscribe(
      result => {
          alert(result)
          this.router.navigate(["stock"]);
      }
    );
  }

  onClickRegister(){
    this.router.navigate(["register"]);
  }

}
