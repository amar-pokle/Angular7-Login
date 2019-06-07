//import * as CryptoJS from 'crypto-js';
//import { InjectorInstance } from './app.module';
//import { CommonService } from './services/common.service';
import { HttpClient } from '@angular/common/http';

declare var $: any;

export class CommonFunctions {
    constructor(http:HttpClient){}
    static version:any = '1.0.0'; //please change version number on update
    
  
    static validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    static validatePassword(password, toastr,_checkAll = true) {
        var p = password,
            errors = [];
        if (p.length < 8) {
            errors.push("Your password must be at least 8 characters.");
        }
        if (p.search(/[a-z]/i) < 0 && _checkAll) {
            errors.push("Your password must contain at least one letter.");
        }
        if (p.search(/[0-9]/) < 0 && _checkAll) {
            errors.push("Your password must contain at least one digit.");
        }
        if (p.search(/(?=.*[!@#$%^&*])/) < 0 && _checkAll) {
            errors.push("Your password must contain at least one special character.");
        }
        if (errors.length > 0) {
            toastr.error(errors.join("\n"));
            return false;
        }
        return true;
    }
}