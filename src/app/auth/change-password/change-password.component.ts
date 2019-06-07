import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changeForm = new FormGroup({
    "oldpassword":new FormControl('',[
      Validators.required,
      Validators.minLength(8)]),
      "newpassword":new FormControl('',[
        Validators.required,
        Validators.minLength(8)]),
        "confirmpassword":new FormControl('',[
          Validators.required,
          Validators.minLength(8)])
  }
 );

 
  constructor( private router: Router,  public toastr: ToastrService ) { }

  ngOnInit() {
  }
  onChange(){
    // if(this.changeForm.get('oldpassword').value != '' || this.changeForm.get('newpassword').value != '' || this.changeForm.get('confirmpassword').value !=''){
    //   if (this.changeForm.get('newpassword').value != this.changeForm.get('confirmpassword').value) {
    //     alert("new password and confirm password should be same");
    //     return false;
    // }
    // else {
    //   // alert("success");
    //   this.toastr.success('Success');
    // }
    // }else{
    //   // alert("plz fill all the field");
    //   document.getElementById('oldpassword').focus();
    //   this.toastr.error('Email is required');
    // }

    if (this.changeForm.get('oldpassword').value == "") {
      document.getElementById('old').focus();
        this.toastr.error('Old password required');
        } 
    
    else if(this.changeForm.get('newpassword').value == "")  {
      document.getElementById('new').focus();
      this.toastr.error(' new password is required');
     }
     else if (this.changeForm.get('confirmpassword').value == "") {
            document.getElementById('confirm').focus();
             this.toastr.error('Confirm-Password is required');
         }
     else if (this.changeForm.get('newpassword').value != this.changeForm.get('confirmpassword').value) {
      // alert("password and confirm password should be same");
           this.toastr.error('password and confirm password should be same');
         return false;
               }  
       else {
     // alert("success");
       this.toastr.success('Password changed Successfully!');
      this.router.navigate(['./login']);
     }            

  }
}



