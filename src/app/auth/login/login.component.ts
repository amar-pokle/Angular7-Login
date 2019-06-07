import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonFunctions } from '../../commonFunction';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../app.service';
//import { CommonVariables } from '../../variable.common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  data: any;
  remember_me: boolean = false;
  user_id: any;
  public loginType: boolean = false;
  //public username: any;
  //public password: any; 

  username = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  
  headers: any;
  constructor(private router: Router, public toastr: ToastrService,
    public appService: AppService, private http: HttpClient) { }

  ngOnInit() {
    // if (localStorage.getItem("remember_me") != null) {
    //   this.remember_me = (localStorage.getItem("remember_me") == 'true') ? true : false;
    //   this.user = (localStorage.getItem("remember_me") == 'true') ? localStorage.getItem("email") : '';
    // }
    // if (localStorage.getItem("user_id") === null) {
    //   this.router.navigate(['/auth/login']);
    // }
    // else if (localStorage.getItem('login') == 'true') {
    //   this.router.navigate([this.appService.loginType]);
    // }
    this.headers = new HttpHeaders();
    this.headers = this.headers.set(
      {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    );

  }

  // getErrorMessage(data) {
  //   //console.log(data);
  //   if (data == 'user') {  
  //     return this.username.hasError('required') ? 'You must enter a email' :
  //       this.username.hasError('email') ? 'Not a valid email' :
  //         this.username.errors.required ? 'Username is required' :
  //           '';
  //   } else if (data == 'pass') {
  //     //console.log(this.password.errors.minlength.actualLength);
  //     return this.password.hasError('required') ? 'You must enter a password' :
  //       (this.password.errors.minlength.actualLength < 9) ? 'password must be greater then or equal to 8 digit' :
  //         this.password.errors.required ? 'Password is required' :
  //           '';
  //   }
  // }

  onSubmit() {
    //console.log(this.username, this.password);
    
    var email = document.getElementById('txtEmail');
    var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (this.username.value == "") {
      document.getElementById('txtEmail').focus();
      this.toastr.error('Email is required');
      // return this.getErrorMessage('user');
    }
    else if (!filter.test(this.username.value)) {
      this.toastr.error('Please provide a valid Email');
    }
    else if (this.password.value == "") {
      document.getElementById('textPass').focus();
      this.toastr.error('Password is required');
    }
    else if (!CommonFunctions.validatePassword(this.password.value, this.toastr)) {
     // this.toastr.error("Password must be greater then or equal to 8 digit.");
      //console.log("Password must be greater then or equal to 8 digit.");
      // return false;
    }
    else {
    // this.toastr.success('Login SuccessFull');
    }



    return this.http.post('http://localhost:8000/api/auth/login',
    {
      "email": this.username.value,
      "password": this.password.value
    }, this.headers)
      .subscribe(res => {
        console.log(res);
        console.log(res['SUCCESS'])
        if(res['SUCCESS']=="SUCCESS"){
          this.router.navigate(['../home']);
          this.toastr.success('Login SuccessFull');
        }
        else   {
          this.toastr.error('Error');
        }
      },err=>{
        console.log(err.statusText);
        if(err.statusText=='Unauthorized'){
          this.toastr.error('Invalid User');
        }
      }); 

    }
  }
    
    // else if (!CommonFunctions.validatePassword(this.pwd)) {
    //   return false;
    // }

    
 


 

  // clicked() {
  //   //alert("Clickd");
  //   var data = '{"email":"abc@gmail.com","password":"abc1234"}';
  //   console.log(data);
  //   return this.http.post('http://localhost:8000/api/auth/login',
  //   {
  //     "email": this.username,
  //     "password": this.password
  //   }, this.headers)
  //     .subscribe(res => {
  //       console.log(res);
  //     },err=>{
  //       console.log(err.error.success);
  //     });
  // }

  





