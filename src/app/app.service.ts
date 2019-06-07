import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public user_id;
  public loginType;
  public lat:any;
  public lng:any;

  constructor(private router:Router) {
    this.loginType = localStorage.getItem('loginType');
    this.user_id = localStorage.getItem('userid');
    
   }

  readonly AUTH_PAGE = "/auth";
  readonly LOGIN_PAGE = "/auth/login";
  readonly REGISTER_PAGE = "/auth/register";
  readonly FORGOT_PASSWORD_PAGE = "/auth/forgot-password";
  readonly CHANGE_PASSWORD_PAGE = "/auth/change-password";

  r

  //  get currentURL(){
  //    return this.router.url;
  //  }
  public callURL(loginType,page){
    return ("/" + loginType + page);
  }
}
