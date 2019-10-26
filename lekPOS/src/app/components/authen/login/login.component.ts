import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkServiceService } from 'src/app/services/network-service.service';
import { environment } from 'src/environments/environment'
import { from } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,
     private networkService: NetworkServiceService) { }

  ngOnInit() {
    if(this.networkService.isLogin()){
      this.router.navigate(["/stock"])
    }
  }

  onSubmit(value){
    this.networkService.login(value).subscribe(
      result => {
          localStorage.
          setItem(environment.keyLocalAuthenInfo, result.token)
          this.router.navigate(["stock"]);
      }
    );
  }

  onClickRegister(){
    this.router.navigate(["register"]);
  }

}
