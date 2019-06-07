import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonFunctions } from '../../commonFunction';
import {  Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

 declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
   data: any;
 //  username = new FormControl('', [Validators.required, Validators.email]);
  // password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  // confirmpassword = new FormControl('', [Validators.required, Validators.minLength(8)]);

  public login_mode_id : any;
  public user_role_id :any;
  public profile_picture: any;
  public profile_cover :any;
  public subscription_status :any;
  // public firstname : any;
  // public lastname :any;
  // public dob : any;
  // public mobile :any;
  // public password :any;



  registerForm = new FormGroup({
    "email": new FormControl('',[
      Validators.required
    ]),
    "password": new FormControl('',[
      Validators.required,
      Validators.minLength(8)
    ]),
    "confirmpassword":new FormControl('',[
      Validators.required,
      Validators.minLength(8)
    ]),
   
  });


  //register form1////
  registerForm1 = new FormGroup({
    "firstname":new FormControl('',[
      Validators.required
    ]),
    "lastname":new FormControl('',[
     Validators.required
    ]),
    "dob":new FormControl('',[
      Validators.required
    ]),
    "mobile":new FormControl('',[
      Validators.required,
      Validators.minLength(10)
    ])
  });
//////register form1///
  
  headers: any;
  phaseToggle:boolean=true;

  constructor(public toastr: ToastrService,  private router: Router, private http: HttpClient ) { }

  ngOnInit() {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set(
      {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    );


  }
  next(){
    this.phaseToggle=false;
    }
    
  
    onSubmit1(){
      //console.log(this.registerForm.get('email'),this.registerForm.get('password'),this.registerForm.get('confirmpassword'));
      
      var email = document.getElementById('textEmail');
      var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
     if (this.registerForm.get('email').value == "") {
       document.getElementById('textEmail').focus();
         this.toastr.error('Email is required');
         } 
         else if (!filter.test(this.registerForm.get('email').value)) {
           //alert('Please provide a valid User Name address');
           this.toastr.error('Please provide a valid Email');
           // return false;
         }
     else if(this.registerForm.get('password').value == "")  {
       document.getElementById('textPass').focus();
       this.toastr.error('Password is required');
      }
      else if (this.registerForm.get('confirmpassword').value == "") {
             document.getElementById('confirmpass').focus();
              this.toastr.error('Confirm-Password is required');
          }
              else if (this.registerForm.get('password').value != this.registerForm.get('confirmpassword').value) {
               //     alert("password and confirm password should be same");
                    this.toastr.error('password and confirm password should be same');
                    return false;
                }   
                else if (!CommonFunctions.validatePassword(this.registerForm.get('password').value, this.toastr)) {
                  // this.toastr.error("Password must be greater then or equal to 8 digit.");
                   //console.log("Password must be greater then or equal to 8 digit.");
                   // return false;
                 }           
       else  {
          //alert("success");
          //this.toastr.success('Success');
          this.phaseToggle=false;
        }
    
      
    }


    register(){
      
      if (this.registerForm1.get('firstname').value == "") {
        document.getElementById('firstName').focus();
          this.toastr.error('first name is required');
          }   
      else if (this.registerForm1.get('lastname').value == "")  {
        document.getElementById('lastName').focus();
        this.toastr.error('last name is required');
       }
      else if (this.registerForm1.get('dob').value == "") {
              document.getElementById('date').focus();
               this.toastr.error('date of birth is required');
           } 
      else if (this.registerForm1.get('mobile').value == "") {
            document.getElementById('mob').focus();
             this.toastr.error('Mobile No. is required');
         }
        //  else if (this.registerForm1.get('mobile').value.toString().length != 0) {
        //   //console.log(this.phone.value.toString().length);
        //   if (!CommonFunctions.validateMobile(this.registerForm1.get('mobile').value)) {
        //     this.toastr.error("Mobile Number contains 10 digits.");
        //     //console.log("Mobile Number only contains 10 digits.");
        //     return false;
        //   }
        // }            
        // else if (this.registerForm1.valid) {
        // //alert("submited");
        // //   this.router.navigate(['./login']);
        //   this.phaseToggle=false;
        //  }
        else{
       // alert("All Field Require");
        this.phaseToggle=false;
         } 


     // console.log(this.registerForm1.get('firstname').value,this.registerForm1.get('lastname').value,this.registerForm1.get('dob').value,this.registerForm1.get('mobile').value, this.registerForm.get('email').value,this.registerForm.get('password').value);
      
      return this.http.post('http://localhost:8000/api/auth/signup',
      {
         "first_name":this.registerForm1.get('firstname').value,
         "last_name": this.registerForm1.get('lastname').value,
         "dob": this.registerForm1.get('dob').value,
         "mobile": this.registerForm1.get('mobile').value,
         "password": this.registerForm.get('password').value,
         "email": this.registerForm.get('email').value,
        "login_mode_id": "1",
        "user_role_id": "2",
        "subscription_status":"1",
        "profile_picture": "xdxsfx/gfcgh",
        "profile_cover": "fxdfgxcgf",
  
      }, this.headers)
        .subscribe(res => {
          console.log(res);
          console.log(res['message'])
          if(res['message']=="Successfully created user!"){
            this.router.navigate(['./login']);
            this.toastr.success('Register SuccessFull');
          }
          else   {
            this.toastr.error('Error');
          }
        },err=>{
          console.log(err.error.success);
        });
      
    
    
      } 
  

    }

