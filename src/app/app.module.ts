import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { AppService } from './app.service';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ToastrModule.forRoot(),
  ],
  providers: [ AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
