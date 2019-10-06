import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // DI
  constructor(private router:Router) { }

  ngOnInit() {
  }

  onSubmit(value){
    alert(JSON.stringify(value));
    this.router.navigate(["stock"]);
  }

  onClickRegister(){
    this.router.navigate(["register"]);
  }

}
