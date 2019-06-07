import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
//import { CommonFunction } from '../../commonFunction';
import {  Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  phase1Form = new FormGroup({
    "email": new FormControl('',[
      Validators.required
    ])
    
  });

  
  phase2Form = new FormGroup({
    "otp":new FormControl('',[
      Validators.required,
      Validators.minLength(5)
    ])

  });
 phase3Form = new FormGroup({
   "password": new FormControl('',[
     Validators.required,
     Validators.minLength(5)
   ]),
   "confirmpassword":new FormControl('',[
    Validators.required,
    Validators.minLength(5)
   ])

 });
  phase1:boolean=true;
  phase2:boolean=false;
  phase3:boolean=false;

  
  constructor( public toastr: ToastrService , private router: Router) { }

  ngOnInit() {
  }
  // get(){
  //   this.phase1=false;
  //   this.phase2=true;
  //   this.phase3=false;
  // }
  verify(){
    this.phase1=false;
    this.phase2=false;
    this.phase3=true;
  }

  onGet(){
   //alert("1");
    if(this.phase1Form.valid){
      // alert("ok");
     // this.toastr.success('Success');
      this.phase1=false;
      this.phase3=false;
      this.phase2=true;
    }
    
    else {
      // alert("Require email Id");
      document.getElementById('email').focus();
      this.toastr.error('Email is required');
    }
  }
  
  onVerify(){
    //alert("1");
    if(this.phase2Form.valid){
      this.phase1=false;
      this.phase2=false;
      this.phase3=true;
    }
    else{
      // alert("Enter received OTP");
      document.getElementById('otpp').focus();
      this.toastr.error('Enter received OTP');
    }
  }

  // valid(event) {
  //   if (!CommonFunction.emailValidator(event.target.value)) {
  //     // alert('invalid email');
  //     this.toastr.error('Invalid Email');
  //    // event.target.value = '';
  //   }
  // }

  onSubmit(){
    

    // if( this.phase3Form.get('password').value != '' || this.phase3Form.get('confirmpassword').value !=''){
    //   if (this.phase3Form.get('password').value != this.phase3Form.get('confirmpassword').value) {
    //     // alert(" password and confirm password should be same");
    //     this.toastr.error('Password and confirm-password should be same');
    //     return false;
    // }
    // else {
    //   // alert("success");
    //   this.toastr.success('Success');
    //   this.router.navigate(['./login']);
    // }
    

    if(this.phase3Form.get('password').value == "") {
     document.getElementById('new').focus();
     this.toastr.error('Password is required');
    }
    else if(this.phase3Form.get('confirmpassword').value == "")  {
     document.getElementById('confirm').focus();
     this.toastr.error('Confirm-Password is required');
    }
      else if (this.phase3Form.get('password').value != this.phase3Form.get('confirmpassword').value) {
        this.toastr.error('Password and confirm-password should be same');
        return false;
    }
    else {   
     // this.toastr.success('Success');
     this.router.navigate(['./login']);
    }

  }
}

 

